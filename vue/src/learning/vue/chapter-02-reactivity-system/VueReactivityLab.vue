<script setup lang="ts">
import {
  computed,
  nextTick,
  reactive,
  ref,
  shallowRef,
  toRef,
  watch,
  watchEffect,
} from "vue";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CatalogSnapshot = {
  label: string;
  version: number;
  meta: {
    status: string;
  };
};

const cartItems = reactive<CartItem[]>([
  { id: 1, name: "Vue Workbook", price: 30, quantity: 1 },
  { id: 2, name: "TypeScript Cards", price: 12, quantity: 2 },
]);
const couponCode = ref("");
const couponMessage = ref("No coupon applied.");
const couponTransition = ref("(none) -> (none)");
const discountRate = ref(0);
const summaryLog = ref("");
const summaryPanel = ref<HTMLElement | null>(null);
const heightBeforePatch = ref(0);
const heightAfterPatch = ref(0);

const subtotal = computed(() =>
  cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  ),
);
const discount = computed(() => subtotal.value * discountRate.value);
const taxableAmount = computed(() => subtotal.value - discount.value);
const tax = computed(() => taxableAmount.value * 0.08);
const total = computed(() => taxableAmount.value + tax.value);

watch(couponCode, (newValue, oldValue) => {
  const normalizedCode = newValue.trim().toUpperCase();

  couponTransition.value =
    `${oldValue || "(empty)"} -> ${newValue || "(empty)"}`;

  if (normalizedCode === "VUE20") {
    discountRate.value = 0.2;
    couponMessage.value = "VUE20 applies a 20% discount.";
  } else {
    discountRate.value = 0;
    couponMessage.value = normalizedCode
      ? "Coupon is not recognized."
      : "No coupon applied.";
  }
});

watchEffect(() => {
  summaryLog.value =
    `${cartItems.length} items | subtotal $${subtotal.value.toFixed(2)} | ` +
    `tax $${tax.value.toFixed(2)} | total $${total.value.toFixed(2)}`;
});

async function changeQuantity(
  item: CartItem,
  amount: number,
): Promise<void> {
  heightBeforePatch.value = summaryPanel.value?.offsetHeight ?? 0;
  item.quantity = Math.max(1, item.quantity + amount);

  await nextTick();

  heightAfterPatch.value = summaryPanel.value?.offsetHeight ?? 0;
}

function updatePrice(item: CartItem, event: Event): void {
  if (!(event.currentTarget instanceof HTMLInputElement)) {
    return;
  }

  const nextPrice = Number(event.currentTarget.value);

  if (Number.isFinite(nextPrice) && nextPrice >= 1) {
    item.price = nextPrice;
  } else {
    event.currentTarget.value = String(item.price);
  }
}

const cartPreferences = reactive({
  label: "Standard cart",
});
const { label: staleLabel } = cartPreferences;
const connectedLabel = toRef(cartPreferences, "label");

function renameCart(): void {
  cartPreferences.label =
    cartPreferences.label === "Standard cart"
      ? "Priority cart"
      : "Standard cart";
}

const catalogSnapshot = shallowRef<CatalogSnapshot>({
  label: "Catalog draft",
  version: 1,
  meta: {
    status: "draft",
  },
});

function mutateSnapshotNestedStatus(): void {
  catalogSnapshot.value.meta.status = "reviewed";
  console.log("Nested shallowRef mutation did not replace the root value.");
}

function replaceCatalogSnapshot(): void {
  catalogSnapshot.value = {
    label: `Catalog release ${catalogSnapshot.value.version + 1}`,
    version: catalogSnapshot.value.version + 1,
    meta: {
      status: "published",
    },
  };
}
</script>

<template>
  <article class="lab">
    <header>
      <p class="topic">Chapter 02 final integration</p>
      <h3>Vue Reactivity Lab</h3>
      <p>
        Local cart state connects computed totals, a coupon watcher, an
        automatic summary effect, DOM timing, destructuring, and shallow root
        replacement.
      </p>
    </header>

    <section class="cart-panel" aria-labelledby="cart-items-title">
      <h4 id="cart-items-title">Shopping cart</h4>
      <div v-for="item in cartItems" :key="item.id" class="cart-row">
        <div>
          <strong>{{ item.name }}</strong>
          <span>${{ item.price.toFixed(2) }} each</span>
        </div>
        <label>
          Price
          <input
            :value="item.price"
            type="number"
            min="1"
            step="1"
            @change="updatePrice(item, $event)"
          />
        </label>
        <div class="quantity-controls">
          <button type="button" @click="changeQuantity(item, -1)">-</button>
          <span>{{ item.quantity }}</span>
          <button type="button" @click="changeQuantity(item, 1)">+</button>
        </div>
      </div>
    </section>

    <section class="coupon-panel">
      <h4>Coupon watcher</h4>
      <label for="lab-coupon">
        Coupon code
        <input
          id="lab-coupon"
          v-model="couponCode"
          type="text"
          placeholder="Try VUE20"
        />
      </label>
      <p>{{ couponMessage }}</p>
      <p>Transition: {{ couponTransition }}</p>
    </section>

    <section ref="summaryPanel" class="summary-panel">
      <h4>Computed summary</h4>
      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>${{ subtotal.toFixed(2) }}</dd>
        </div>
        <div>
          <dt>Discount</dt>
          <dd>-${{ discount.toFixed(2) }}</dd>
        </div>
        <div>
          <dt>Tax</dt>
          <dd>${{ tax.toFixed(2) }}</dd>
        </div>
        <div>
          <dt>Total</dt>
          <dd>${{ total.toFixed(2) }}</dd>
        </div>
      </dl>
      <p class="effect-log">{{ summaryLog }}</p>
      <p>
        Height before patch: {{ heightBeforePatch }}px | after nextTick:
        {{ heightAfterPatch }}px
      </p>
    </section>

    <div class="boundary-grid">
      <section>
        <h4>Destructuring boundary</h4>
        <p>Snapshot: {{ staleLabel }}</p>
        <p>Direct source: {{ cartPreferences.label }}</p>
        <p>Connected ref: {{ connectedLabel }}</p>
        <button type="button" @click="renameCart">Rename source</button>
      </section>

      <section>
        <h4>shallowRef boundary</h4>
        <p>{{ catalogSnapshot.label }} | v{{ catalogSnapshot.version }}</p>
        <p>Status: {{ catalogSnapshot.meta.status }}</p>
        <button type="button" @click="mutateSnapshotNestedStatus">
          Mutate nested status
        </button>
        <button type="button" @click="replaceCatalogSnapshot">
          Replace snapshot
        </button>
      </section>
    </div>
  </article>
</template>

<style scoped>
.lab {
  padding: 1.5rem;
  border: 2px solid #2f8161;
  border-radius: 1rem;
  background: #ffffff;
  box-shadow: 0 1rem 2.5rem rgba(33, 53, 71, 0.08);
}

.topic {
  margin: 0;
  color: #18794e;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.5rem;
  font-size: 1.8rem;
}

h4 {
  margin-top: 0;
}

.cart-panel,
.coupon-panel,
.summary-panel,
.boundary-grid section {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #d7e2dc;
  border-radius: 0.75rem;
  background: #f9fcfa;
}

.cart-row {
  display: grid;
  grid-template-columns: minmax(180px, 1fr) 110px auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-top: 1px solid #e1e9e5;
}

.cart-row > div:first-child {
  display: grid;
  gap: 0.2rem;
}

label {
  display: grid;
  gap: 0.35rem;
  font-weight: 700;
}

input {
  min-width: 0;
  padding: 0.55rem;
  border: 1px solid #a9c0b5;
  border-radius: 0.45rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

button {
  padding: 0.5rem 0.7rem;
  border: 1px solid #9ebcad;
  border-radius: 0.5rem;
  background: #edf8f2;
  color: #185b3e;
  cursor: pointer;
}

dl {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.6rem;
}

dl div {
  padding: 0.65rem;
  border-radius: 0.55rem;
  background: #eaf6ef;
}

dt {
  color: #607067;
  font-size: 0.8rem;
}

dd {
  margin: 0.2rem 0 0;
  font-weight: 800;
}

.effect-log {
  padding: 0.65rem;
  border-radius: 0.55rem;
  background: #edf2f7;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.boundary-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.boundary-grid section {
  margin-top: 0;
}

.boundary-grid button + button {
  margin-left: 0.4rem;
}

@media (max-width: 760px) {
  .cart-row,
  .boundary-grid {
    grid-template-columns: 1fr;
  }

  dl {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
