// Goal:
// Verify expressions, props, children in JSX

const productName = 'Mechanical Keyboard';
const stockCount = 12;
const isAvailable = stockCount > 0;

const productBadgeElement = (
  <section className = 'productBadge' data-available = {isAvailable}>
    <h2>{productName}</h2>
    <p>{stockCount} items available</p>
  </section>
)
console.log(productBadgeElement)