const privateProfileMetadataStore = new WeakMap();

function createProfileRecord(profileId, displayName) {
  const profileRecord = {
    id: profileId,
    name: displayName,
  };

  privateProfileMetadataStore.set(profileRecord, {
    accessCount: 0,
    verified: false,
  });

  return profileRecord;
}

function markProfileVerified(profileRecord) {
  const metadataRecord = privateProfileMetadataStore.get(profileRecord);

  metadataRecord.verified = true;
}

function readProfileMetadata(profileRecord) {
  return privateProfileMetadataStore.get(profileRecord);
}

const currentProfileRecord = createProfileRecord(1, 'Ada');

console.log(currentProfileRecord);
console.log(currentProfileRecord.verified);
console.log(readProfileMetadata(currentProfileRecord));

markProfileVerified(currentProfileRecord);

console.log(readProfileMetadata(currentProfileRecord));
