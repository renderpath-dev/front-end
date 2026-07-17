// Goal:
// Prefer composition when behavior can be injected instead of inherited.

// Expected output:
// Keyboard: $99.00

class PriceFormatter {
  format(cents) {
    return `$${(cents / 100).toFixed(2)}`;
  }
}

class ProductPresenter {
  constructor(formatter) {
    this.formatter = formatter;
  }

  present(product) {
    return `${product.title}: ${this.formatter.format(product.priceCents)}`;
  }
}

const presenter = new ProductPresenter(new PriceFormatter());
console.log(presenter.present({ title: "Keyboard", priceCents: 9900 }));
