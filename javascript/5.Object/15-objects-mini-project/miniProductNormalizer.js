// Goal:
// Build normalized product cards from raw records by using object operations.

const defaultProductCard = {
  currency: "USD",
  visible: true,
  stock: 0,
  tags: [],
  get isAvailable() {
    return this.visible && this.stock > 0;
  },
  toJSON() {
    return {
      sku: this.sku,
      title: this.title,
      price: this.price,
      currency: this.currency,
      stock: this.stock,
      available: this.isAvailable,
      tags: this.tags,
    };
  },
};

const internalMetaKey = Symbol("internalMeta");

function normalizeProduct(rawProduct) {
  const normalizedProduct = Object.create(defaultProductCard);

  Object.assign(normalizedProduct, {
    sku: rawProduct.sku,
    title: rawProduct.title ?? "Untitled product",
    price: Number(rawProduct.price),
    stock: Number(rawProduct.stock ?? 0),
    tags: [...(rawProduct.tags ?? [])],
  });

  normalizedProduct[internalMetaKey] = {
    source: rawProduct.source ?? "manual",
  };

  return normalizedProduct;
}

function buildProductIndex(rawProducts) {
  const productIndex = Object.create(null);

  for (const rawProduct of rawProducts) {
    const normalizedProduct = normalizeProduct(rawProduct);
    productIndex[normalizedProduct.sku] = normalizedProduct;
  }

  return productIndex;
}

function listSerializableCards(productIndex) {
  return Object.keys(productIndex).map((sku) => productIndex[sku]);
}

const rawProducts = [
  { sku: "BK-1", title: "JS Object Guide", price: "39", stock: "4", tags: ["book"] },
  { sku: "HD-2", title: "Keyboard", price: 79, source: "import" },
];

const productIndex = buildProductIndex(rawProducts);
const cards = listSerializableCards(productIndex);

console.log(productIndex["BK-1"].isAvailable);
console.log(Object.hasOwn(productIndex, "BK-1"));
console.log(Object.getPrototypeOf(productIndex["BK-1"]) === defaultProductCard);
console.log(JSON.stringify(cards));
