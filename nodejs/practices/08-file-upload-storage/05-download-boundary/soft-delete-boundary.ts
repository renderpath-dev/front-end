type AttachmentState = {
  status: "READY" | "DELETED";
  deletedAt: Date | null;
  storageKey: string;
};

export function markDeleted(attachment: AttachmentState, now: Date): AttachmentState {
  return {
    ...attachment,
    status: "DELETED",
    deletedAt: now
  };
}

console.log(markDeleted({
  status: "READY",
  deletedAt: null,
  storageKey: "owners/u1/notes/n1/attachments/file.pdf"
}, new Date("2026-01-01T00:00:00.000Z")));
