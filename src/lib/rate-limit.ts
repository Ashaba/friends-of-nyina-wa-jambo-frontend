/**
 * In-process fixed-window rate limiting for the public form actions.
 *
 * Scope is deliberately modest. Counters live in the Node process, so on a
 * serverless deployment each instance keeps its own window and traffic spread
 * across instances gets a proportionally higher ceiling. This blunts the cheap
 * case — one script hammering one endpoint — rather than enforcing an
 * authoritative quota. A shared store (Redis, Vercel KV) is the upgrade path if
 * abuse ever outgrows it.
 *
 * The clock is a parameter rather than a call to `Date.now()` inside, so the
 * windowing logic can be tested without waiting in real time.
 */

export interface RateLimitOptions {
  /** Attempts permitted to one key within a window. */
  limit: number;
  windowMs: number;
}

export interface RateLimitVerdict {
  allowed: boolean;
  /** Attempts left in the current window, after counting this one. */
  remaining: number;
  /** Whole seconds until the window resets. Only meaningful when blocked. */
  retryAfterSeconds: number;
}

export interface RateLimiter {
  check(key: string, now?: number): RateLimitVerdict;
}

interface Window {
  count: number;
  expiresAt: number;
}

// Bounds memory if an attacker cycles through spoofed keys: once this many
// windows are held, expired ones are swept before any new key is admitted.
const SWEEP_THRESHOLD = 10_000;

export function createRateLimiter(options: RateLimitOptions): RateLimiter {
  const windows = new Map<string, Window>();

  function sweep(now: number): void {
    for (const [key, window] of windows) {
      if (window.expiresAt <= now) windows.delete(key);
    }
  }

  return {
    check(key: string, now: number = Date.now()): RateLimitVerdict {
      const existing = windows.get(key);

      if (!existing || existing.expiresAt <= now) {
        if (windows.size >= SWEEP_THRESHOLD) sweep(now);
        windows.set(key, { count: 1, expiresAt: now + options.windowMs });
        return {
          allowed: true,
          remaining: options.limit - 1,
          retryAfterSeconds: 0,
        };
      }

      const retryAfterSeconds = Math.ceil((existing.expiresAt - now) / 1000);

      if (existing.count >= options.limit) {
        // Deliberately not extended on a blocked attempt: hammering the
        // endpoint should not push the visitor's own reset further away.
        return { allowed: false, remaining: 0, retryAfterSeconds };
      }

      existing.count += 1;
      return {
        allowed: true,
        remaining: options.limit - existing.count,
        retryAfterSeconds,
      };
    },
  };
}
