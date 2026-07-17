// Goal:
// Verify that public fields are own properties created per instance.

// Expected output:
// draft
// true
// false

class ProductDraft {
  status = "draft";
  tags = [];

  constructor(title) {
    this.title = title;
  }
}

const firstDraft = new ProductDraft("Keyboard");
const secondDraft = new ProductDraft("Mouse");

firstDraft.tags.push("sale");

console.log(firstDraft.status);
console.log(Object.hasOwn(firstDraft, "status"));
console.log(firstDraft.tags === secondDraft.tags);
