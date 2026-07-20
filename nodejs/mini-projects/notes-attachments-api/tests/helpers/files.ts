import { mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const onePixelPng = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=",
  "base64"
);

export async function createFixtureDirectory(): Promise<string> {
  const directory = path.join(tmpdir(), `notes-attachments-${Date.now()}-${Math.random().toString(16).slice(2)}`);
  await mkdir(directory, { recursive: true });
  return directory;
}

export async function writePngFixture(directory: string, filename = "diagram.png"): Promise<string> {
  const filePath = path.join(directory, filename);
  await writeFile(filePath, onePixelPng);
  return filePath;
}

export async function writeInvalidFixture(directory: string, filename = "fake.png"): Promise<string> {
  const filePath = path.join(directory, filename);
  await writeFile(filePath, Buffer.from("not a png"));
  return filePath;
}

export async function removeFixtureDirectory(directory: string): Promise<void> {
  await rm(directory, { recursive: true, force: true });
}
