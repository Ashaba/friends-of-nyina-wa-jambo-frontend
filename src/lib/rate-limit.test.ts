import { describe, it, expect } from "vitest";
import { createRateLimiter } from "@/lib/rate-limit";

describe("createRateLimiter", () => {
  const options = { limit: 3, windowMs: 60_000 };

  it("allows attempts up to the limit and reports what is left", () => {
    const limiter = createRateLimiter(options);

    expect(limiter.check("ip", 0).remaining).toBe(2);
    expect(limiter.check("ip", 1_000).remaining).toBe(1);

    const last = limiter.check("ip", 2_000);
    expect(last.allowed).toBe(true);
    expect(last.remaining).toBe(0);
  });

  it("blocks the attempt after the limit is reached", () => {
    const limiter = createRateLimiter(options);
    for (let attempt = 0; attempt < options.limit; attempt += 1) {
      limiter.check("ip", 0);
    }

    const blocked = limiter.check("ip", 0);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfterSeconds).toBe(60);
  });

  it("counts each key independently", () => {
    const limiter = createRateLimiter(options);
    for (let attempt = 0; attempt < options.limit; attempt += 1) {
      limiter.check("noisy", 0);
    }

    expect(limiter.check("noisy", 0).allowed).toBe(false);
    expect(limiter.check("quiet", 0).allowed).toBe(true);
  });

  it("starts a fresh window once the previous one expires", () => {
    const limiter = createRateLimiter(options);
    for (let attempt = 0; attempt < options.limit; attempt += 1) {
      limiter.check("ip", 0);
    }
    expect(limiter.check("ip", 59_999).allowed).toBe(false);

    const afterReset = limiter.check("ip", 60_000);
    expect(afterReset.allowed).toBe(true);
    expect(afterReset.remaining).toBe(2);
  });

  it("does not push the reset further away when a blocked caller retries", () => {
    const limiter = createRateLimiter(options);
    for (let attempt = 0; attempt < options.limit; attempt += 1) {
      limiter.check("ip", 0);
    }

    limiter.check("ip", 30_000);
    expect(limiter.check("ip", 30_000).retryAfterSeconds).toBe(30);
    expect(limiter.check("ip", 60_000).allowed).toBe(true);
  });
});
