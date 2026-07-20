type LogFields = Record<string, unknown>;

export const logger = {
  info(message: string, fields: LogFields = {}): void {
    console.log(JSON.stringify({ level: "info", message, ...fields }));
  },
  error(message: string, fields: LogFields = {}): void {
    console.error(JSON.stringify({ level: "error", message, ...fields }));
  }
};
