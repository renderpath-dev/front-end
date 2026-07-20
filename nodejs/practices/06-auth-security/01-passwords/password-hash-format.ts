type PasswordHashMetadata = {
  algorithm: string;
  version: string;
  memory: number;
  passes: number;
  parallelism: number;
  tagLength: number;
};

export function readPasswordHashMetadata(storedHash: string): PasswordHashMetadata {
  const [namespace, algorithm, versionPart, memoryPart, passesPart, parallelismPart, tagLengthPart] = storedHash.split("$");

  if (namespace !== "secure-notes" || algorithm !== "argon2id") {
    throw new Error("Unsupported password hash namespace or algorithm.");
  }

  return {
    algorithm,
    version: versionPart.replace("v=", ""),
    memory: Number(memoryPart.replace("m=", "")),
    passes: Number(passesPart.replace("t=", "")),
    parallelism: Number(parallelismPart.replace("p=", "")),
    tagLength: Number(tagLengthPart.replace("l=", ""))
  };
}
