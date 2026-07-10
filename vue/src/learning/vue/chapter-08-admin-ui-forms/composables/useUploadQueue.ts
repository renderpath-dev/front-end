import { computed, shallowRef } from "vue";
import type {
  LocalUploadResult,
  UploadFailureReason,
  UploadQueueItem,
} from "../contracts/uploadContracts";

const allowedTypes = new Set(["image/jpeg", "image/png", "application/pdf"]);
const maximumFileSize = 2 * 1024 * 1024;
let uploadSequence = 0;

function validateFile(file: File): UploadFailureReason | null {
  if (!allowedTypes.has(file.type)) {
    return "unsupported-type";
  }

  if (file.size > maximumFileSize) {
    return "file-too-large";
  }

  return null;
}

function simulateUpload(item: UploadQueueItem): LocalUploadResult {
  if (item.name.toLowerCase().includes("fail")) {
    return {
      success: false,
      reason: "simulated-network-error",
    };
  }

  return {
    success: true,
    reason: null,
  };
}

export function useUploadQueue() {
  const queue = shallowRef<Array<UploadQueueItem>>([]);
  const items = computed<ReadonlyArray<UploadQueueItem>>(() => queue.value);

  function addFiles(files: ReadonlyArray<File>): void {
    const nextItems = files.map<UploadQueueItem>((file) => {
      uploadSequence += 1;
      const failureReason = validateFile(file);

      return {
        id: `local-upload-${uploadSequence}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type || "unknown",
        status: failureReason === null ? "ready" : "failed",
        failureReason,
      };
    });

    queue.value = [...queue.value, ...nextItems];
  }

  function patchItem(
    id: string,
    patch: Partial<Pick<UploadQueueItem, "status" | "failureReason">>,
  ): void {
    queue.value = queue.value.map((item) =>
      item.id === id ? { ...item, ...patch } : item,
    );
  }

  function start(id: string): void {
    const item = queue.value.find((candidate) => candidate.id === id);
    if (!item || validateFile(item.file) !== null) {
      return;
    }

    patchItem(id, {
      status: "uploading",
      failureReason: null,
    });
    const result = simulateUpload(item);
    patchItem(id, {
      status: result.success ? "success" : "failed",
      failureReason: result.reason,
    });
  }

  function retry(id: string): void {
    start(id);
  }

  function remove(id: string): void {
    queue.value = queue.value.filter((item) => item.id !== id);
  }

  function clear(): void {
    queue.value = [];
  }

  return {
    items,
    addFiles,
    start,
    retry,
    remove,
    clear,
  };
}
