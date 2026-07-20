type UploadStep = "write-temp" | "validate" | "copy-object" | "insert-metadata" | "cleanup-temp";

const compensationPolicy: Record<UploadStep, string> = {
  "write-temp": "remove temp file",
  validate: "remove temp file",
  "copy-object": "delete copied object if metadata insert fails",
  "insert-metadata": "record READY attachment after copy succeeds",
  "cleanup-temp": "ignore missing temp file"
};

console.log(compensationPolicy);

export {};
