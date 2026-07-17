// Goal:
// Render cart data with JSX

import {calculateCartSubtotal} from "./cartMath.js";

export function CartSummary({cartItems}) {
    const subtotalAmount = calculateCartSubtotal(cartItems);

    return (
        <section>
            <h2>Cart Summary</h2>
            <p>Total: ${subtotalAmount}</p>
        </section>
    );
}