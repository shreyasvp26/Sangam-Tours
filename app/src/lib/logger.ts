/**
 * Minimal production logging — Document 09 §6 / Document 11 §4.4.
 * Logs operational signals only; never enquiry PII (name, phone, email, message).
 */

type LogFields = Record<string, string | number | boolean | undefined | null>;

function emit(level: "info" | "warn" | "error", event: string, fields?: LogFields): void {
  const payload = {
    level,
    event,
    ts: new Date().toISOString(),
    ...fields,
  };

  const line = JSON.stringify(payload);

  if (level === "error") {
    console.error(line);
    return;
  }
  if (level === "warn") {
    console.warn(line);
    return;
  }
  console.info(line);
}

export const logger = {
  info(event: string, fields?: LogFields) {
    emit("info", event, fields);
  },
  warn(event: string, fields?: LogFields) {
    emit("warn", event, fields);
  },
  error(event: string, fields?: LogFields) {
    emit("error", event, fields);
  },
};
