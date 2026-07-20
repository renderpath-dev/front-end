type LogLevel = "info" | "warn" | "error";

type LogFields = Record<string, string | number | boolean | null | undefined>;

function serializeError(error: unknown): LogFields {
  if (error instanceof Error) {
    return {
      errorName: error.name,
      errorMessage: error.message
    };
  }

  return {
    errorMessage: "Unknown error"
  };
}

function writeLog(level: LogLevel, message: string, fields: LogFields = {}, error?: unknown) {
  const entry = {
    level,
    message,
    time: new Date().toISOString(),
    ...fields,
    ...(error === undefined ? {} : serializeError(error))
  };

  const line = JSON.stringify(entry);

  if (level === "error") {
    console.error(line);
    return;
  }

  if (level === "warn") {
    console.warn(line);
    return;
  }

  console.log(line);
}

export const logger = {
  info(message: string, fields?: LogFields) {
    writeLog("info", message, fields);
  },

  warn(message: string, fields?: LogFields) {
    writeLog("warn", message, fields);
  },

  error(message: string, fields?: LogFields, error?: unknown) {
    writeLog("error", message, fields, error);
  }
};
