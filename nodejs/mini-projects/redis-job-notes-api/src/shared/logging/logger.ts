type LogPayload = Record<string, unknown>;

function write(level: "info" | "error", payload: LogPayload, message: string): void {
  const entry = {
    level,
    message,
    ...payload
  };

  if (level === "error") {
    console.error(JSON.stringify(entry));
    return;
  }

  console.log(JSON.stringify(entry));
}

export const logger = {
  info(payload: LogPayload, message: string) {
    write("info", payload, message);
  },
  error(payload: LogPayload, message: string) {
    write("error", payload, message);
  }
};
