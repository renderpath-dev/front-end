// Goal:
// Store metadata for object keys without exposing it on the object.

const elementMetadataStore = new WeakMap();

function attachElementMetadata(domElementObject, metadataRecord) {
  elementMetadataStore.set(domElementObject, metadataRecord);
}

function readElementMetadata(domElementObject) {
  return elementMetadataStore.get(domElementObject);
}

const simulatedButtonNode = { nodeName: 'BUTTON' ,isEnabled: false };
attachElementMetadata(simulatedButtonNode, { role: 'submit-control' });

console.log(readElementMetadata(simulatedButtonNode));
