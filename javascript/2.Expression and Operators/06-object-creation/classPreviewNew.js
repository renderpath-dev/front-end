// Goal:
// Preview class construction with new.

class ProductCard {
  constructor(title) {
    this.title = title;
  }

  getLabel() {
    return `product:${this.title}`;
  }
}

const card = new ProductCard("Chair");
console.log(card.getLabel());
console.log(card instanceof ProductCard);
