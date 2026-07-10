export type UploadStatus =
  | "ready"
  | "uploading"
  | "success"
  | "failed";

export type UploadFailureReason =
  | "unsupported-type"
  | "file-too-large"
  | "simulated-network-error";

export type UploadQueueItem = {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: UploadStatus;
  failureReason: UploadFailureReason | null;
};

export type LocalUploadResult = {
  success: boolean;
  reason: UploadFailureReason | null;
};
