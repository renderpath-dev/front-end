<script setup lang="ts">
import { ref, watch } from "vue";

const couponCode = ref("");
const validationMessage = ref("Enter a local coupon code.");
const previousCoupon = ref("(none)");
const currentCoupon = ref("(none)");

watch(couponCode, (newValue, oldValue) => {
  const normalizedCode = newValue.trim().toUpperCase();

  previousCoupon.value = oldValue || "(empty)";
  currentCoupon.value = newValue || "(empty)";

  if (!normalizedCode) {
    validationMessage.value = "Coupon is empty.";
  } else if (normalizedCode === "VUE20") {
    validationMessage.value = "Coupon VUE20 is valid.";
  } else {
    validationMessage.value = "Coupon is not recognized.";
  }
});
</script>

<template>
  <article class="demo-card">
    <p class="topic">watch</p>
    <h3>Explicit source and side effect</h3>

    <label for="coupon-code">Coupon code</label>
    <input
      id="coupon-code"
      v-model="couponCode"
      type="text"
      placeholder="Try VUE20"
    />

    <dl>
      <div>
        <dt>Old value</dt>
        <dd>{{ previousCoupon }}</dd>
      </div>
      <div>
        <dt>New value</dt>
        <dd>{{ currentCoupon }}</dd>
      </div>
    </dl>

    <p class="result" aria-live="polite">{{ validationMessage }}</p>
    <p class="note">
      The watcher names <code>couponCode</code> as its source. Local validation
      is the side effect; a pure display calculation would belong in a
      computed ref.
    </p>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.25rem;
  border: 1px solid #d8d4e5;
  border-radius: 0.9rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #6547a8;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 1rem;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 700;
}

input {
  width: 100%;
  padding: 0.65rem;
  border: 1px solid #bbb1d2;
  border-radius: 0.5rem;
}

dl {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

dl div {
  padding: 0.7rem;
  border-radius: 0.6rem;
  background: #f7f4fc;
}

dt {
  color: #6b6478;
  font-size: 0.8rem;
}

dd {
  margin: 0.25rem 0 0;
  font-weight: 700;
}

.result {
  font-weight: 700;
}

.note {
  margin-bottom: 0;
  color: #605b69;
  line-height: 1.6;
}
</style>
