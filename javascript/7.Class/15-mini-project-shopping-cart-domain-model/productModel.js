// Goal:
// Define product classes with shared behavior and subclass-specific behavior.

export class Product {
  constructor(id, title, priceCents) {
    if (!Number.isInteger(priceCents) || priceCents < 0) {
      throw new RangeError("priceCents must be non-negative cents");
    }

    this.id = id;
    this.title = title;
    this.priceCents = priceCents;
  }

  get label() {
    return `${this.title}: ${this.priceCents}`;
  }

  toJSON() {
    return {
      type: "physical",
      id: this.id,
      title: this.title,
      priceCents: this.priceCents,
    };
  }
}

export class DigitalProduct extends Product {
  constructor(id, title, priceCents, fileType) {
    super(id, title, priceCents);
    this.fileType = fileType;
  }

  get label() {
    return `${super.label} [${this.fileType}]`;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      type: "digital",
      fileType: this.fileType,
    };
  }
}
