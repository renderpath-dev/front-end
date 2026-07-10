<script setup lang="ts">
import { ref, watchEffect } from "vue";

const quantity = ref(2);
const unitPrice = ref(12);
const effectLog = ref("");
const effectActive = ref(true);
let effectRunCount = 0;

const stopEffect = watchEffect(() => {
  const currentQuantity = quantity.value;
  const currentUnitPrice = unitPrice.value;

  effectRunCount += 1;
  effectLog.value =
    `Run ${effectRunCount}: ${currentQuantity} × $${currentUnitPrice} = ` +
    `$${(currentQuantity * currentUnitPrice).toFixed(2)}`;
});

function stopTracking(): void {
  stopEffect();
  effectActive.value = false;
}
</script>

<template>
  <article class="demo-card">
    <p class="topic">watchEffect</p>
    <h3>Automatic synchronous dependency collection</h3>

    <div class="controls">
      <label>
        Quantity
        <input v-model.number="quantity" type="number" min="1" />
      </label>
      <label>
        Unit price
        <input v-model.number="unitPrice" type="number" min="1" />
      </label>
    </div>

    <p class="log" aria-live="polite">{{ effectLog }}</p>
    <button type="button" :disabled="!effectActive" @click="stopTracking">
      {{ effectActive ? "Stop effect" : "Effect stopped" }}
    </button>
    <p class="note">
      The effect automatically tracks the synchronous reads of
      <code>quantity.value</code> and <code>unitPrice.value</code>. More hidden
      reads would make the dependency list harder to audit than an explicit
      watch source.
    </p>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.25rem;
  border: 1px solid #c9dbe7;
  border-radius: 0.9rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #176b87;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 1rem;
}

.controls {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

label {
  display: grid;
  gap: 0.35rem;
  font-weight: 700;
}

input {
  min-width: 0;
  padding: 0.6rem;
  border: 1px solid #a9c5d4;
  border-radius: 0.5rem;
}

.log {
  padding: 0.75rem;
  border-radius: 0.6rem;
  background: #eef8fc;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

button {
  padding: 0.55rem 0.75rem;
  border: 1px solid #8bb8ca;
  border-radius: 0.5rem;
  background: #e8f6fb;
  color: #12566e;
  cursor: pointer;
}

button:disabled {
  cursor: default;
  opacity: 0.6;
}

.note {
  margin-bottom: 0;
  color: #53656d;
  line-height: 1.6;
}
</style>
