import { StringDecoder } from 'node:string_decoder';
import { Transform } from 'node:stream';

export class LineSplitter extends Transform {
  #decoder = new StringDecoder('utf8');
  #remainder = '';

  constructor() {
    super({ readableObjectMode: true });
  }

  _transform(chunk, encoding, callback) {
    const text = this.#remainder + this.#decoder.write(chunk);
    const lines = text.split(/\r?\n/);
    this.#remainder = lines.pop() ?? '';

    for (const line of lines) {
      if (line.length > 0) {
        this.push(line);
      }
    }

    callback();
  }

  _flush(callback) {
    const finalLine = this.#remainder + this.#decoder.end();
    if (finalLine.length > 0) {
      this.push(finalLine);
    }
    callback();
  }
}
