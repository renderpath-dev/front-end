export type ParsedUploadFile = {
  fieldName: string;
  originalName: string;
  declaredMimeType: string;
  encoding: string;
  tempPath: string;
  byteSize: number;
  sha256: string;
  truncated: boolean;
};

export type ParsedMultipartUpload = {
  fields: Record<string, string>;
  file: ParsedUploadFile;
};

export type AllowedFileType = {
  extension: ".png" | ".jpg" | ".jpeg" | ".pdf";
  detectedMimeType: "image/png" | "image/jpeg" | "application/pdf";
};

export type ValidatedUploadFile = ParsedUploadFile & AllowedFileType;
