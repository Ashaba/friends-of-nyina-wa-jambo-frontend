/**
 * Minimal structured logger shared by server and client code.
 *
 * Events are emitted as a stable event name plus a field object rather than an
 * interpolated sentence, so they can be filtered and queried instead of parsed.
 * Anything placed in `fields` is visible wherever the log lands — in the
 * browser console for client components — so callers must pass only values that
 * are safe to disclose.
 */

export type LogFields = Record<
  string,
  string | number | boolean | null | undefined
>;

export interface Logger {
  /** Development-only detail; silenced in production to keep logs readable. */
  debug(event: string, fields?: LogFields): void;
  info(event: string, fields?: LogFields): void;
  /** A recoverable problem: the request degraded but the page still renders. */
  warn(event: string, fields?: LogFields): void;
  error(event: string, fields?: LogFields): void;
}

type ConsoleLevel = "debug" | "info" | "warn" | "error";

function emit(
  level: ConsoleLevel,
  scope: string,
  event: string,
  fields?: LogFields
): void {
  const label = `[${scope}] ${event}`;
  if (fields && Object.keys(fields).length > 0) {
    console[level](label, fields);
    return;
  }
  console[level](label);
}

/**
 * Creates a logger namespaced to one area of the app (e.g. "strapi").
 * The scope is prefixed to every event so logs stay attributable.
 */
export function createLogger(scope: string): Logger {
  return {
    debug(event, fields) {
      if (process.env.NODE_ENV !== "production") {
        emit("debug", scope, event, fields);
      }
    },
    info(event, fields) {
      emit("info", scope, event, fields);
    },
    warn(event, fields) {
      emit("warn", scope, event, fields);
    },
    error(event, fields) {
      emit("error", scope, event, fields);
    },
  };
}
