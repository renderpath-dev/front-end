// Goal:
// Compose the root application component

import {CartSummary} from "./cart/CartSummary";
import {ActionButton} from "./components/ActionButton";

const cartItems =[
    {priceAmount:30, quantityCount:2},
    {priceAmount:15,quantityCount:4},
];

export function App() {
    function handleCheckout() {
        console.log("Checkout clicked");
    }

    return(
        <main>
            <h1>Toolchain JSX Demo</h1>
            <CartSummary cartItems={cartItems} />
            <ActionButton onPress={handleCheckout}>
                Checkout
            </ActionButton>
        </main>
    );
}