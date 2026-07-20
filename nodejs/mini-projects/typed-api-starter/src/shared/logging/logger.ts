export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogContext = Record<string, unknown> & {
  requestId?: string;
};

type LoggerSink = (line: string) => void;

type SerializedError = {
  name: string;
  message: string;
  code?: string;
  statusCode?: number;
};

const defaultSink: LoggerSink = (line) => {
  process.stdout.write(`${line}\n`);
};

let sink: LoggerSink = defaultSink;

function serializeError(error: unknown): SerializedError | undefined {
  if (error === undefined) {
    return undefined;
  }

  if (error instanceof Error) {
    const maybeCode = "code" in error && typeof error.code === "string" ? error.code : undefined;
    const maybeStatusCode = "statusCode" in error && typeof error.statusCode === "number" ? error.statusCode : undefined;

    return {
      name: error.name,
      message: error.message,
      code: maybeCode,
      statusCode: maybeStatusCode
    };
  }

  return {
    name: "UnknownError",
    message: "Non-error value was thrown"
  };
}

function writeLog(level: LogLevel, message: string, context: LogContext = {}, error?: unknown): void {
  sink(JSON.stringify({
    level,
    message,
    requestId: context.requestId,
    context,
    error: serializeError(error)
  }));
}

export const logger = {
  debug(message: string, context?: LogContext): void {
    writeLog("debug", message, context);
  },
  info(message: string, context?: LogContext): void {
    writeLog("info", message, context);
  },
  warn(message: string, context?: LogContext): void {
    writeLog("warn", message, context);
  },
  error(message: string, context?: LogContext, error?: unknown): void {
    writeLog("error", message, context, error);
  }
};

export function setLoggerSink(nextSink: LoggerSink): void {
  sink = nextSink;
}

export function resetLoggerSink(): void {
  sink = defaultSink;
}
