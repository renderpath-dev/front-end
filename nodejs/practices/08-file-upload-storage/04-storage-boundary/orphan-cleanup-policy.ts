type OrphanCandidate = {
  storageKey: string;
  existsInDatabase: boolean;
  objectAgeMinutes: number;
};

export function shouldDeleteOrphan(candidate: OrphanCandidate): boolean {
  return !candidate.existsInDatabase && candidate.objectAgeMinutes >= 60;
}

console.log(shouldDeleteOrphan({
  storageKey: "owners/u1/notes/n1/attachments/file.png",
  existsInDatabase: false,
  objectAgeMinutes: 90
}));
