import { Transform } from 'node:stream';

export class LogSummaryTransform extends Transform {
  #summary;

  constructor({ slowThresholdMs }) {
    super({ writableObjectMode: true });
    this.#summary = {
      totalRecords: 0,
      statusCodes: {},
      slowRequests: 0,
      errorRequests: 0,
      errorRate: 0,
      slowThresholdMs,
    };
  }

  _transform(line, encoding, callback) {
    try {
      const record = JSON.parse(line);
      const statusKey = String(record.status);

      this.#summary.totalRecords += 1;
      this.#summary.statusCodes[statusKey] =
        (this.#summary.statusCodes[statusKey] ?? 0) + 1;

      if (record.durationMs > this.#summary.slowThresholdMs) {
        this.#summary.slowRequests += 1;
      }

      if (record.status >= 500) {
        this.#summary.errorRequests += 1;
      }

      callback();
    } catch (error) {
      callback(new Error(`Invalid log record: ${error.message}`));
    }
  }

  _flush(callback) {
    const { totalRecords, errorRequests } = this.#summary;
    this.#summary.errorRate =
      totalRecords === 0 ? 0 : errorRequests / totalRecords;
    this.push(`${JSON.stringify(this.#summary, null, 2)}\n`);
    callback();
  }
}
