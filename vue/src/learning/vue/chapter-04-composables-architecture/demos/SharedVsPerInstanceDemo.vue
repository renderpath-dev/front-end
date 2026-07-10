<script lang="ts">
import { ref, type Ref } from "vue";

type SharedCounterState = {
  count: Ref<number>;
  increment: () => void;
};

const sharedCount = ref(0);

function useDeliberatelySharedCounter(): SharedCounterState {
  function increment(): void {
    sharedCount.value += 1;
  }

  return {
    count: sharedCount,
    increment,
  };
}
</script>

<script setup lang="ts">
import { useCounter } from "../composables/useCounter";

const independentFirst = useCounter();
const independentSecond = useCounter();
const sharedFirst = useDeliberatelySharedCounter();
const sharedSecond = useDeliberatelySharedCounter();
</script>

<template>
  <article class="demo-card">
    <p class="topic">Ownership comparison</p>
    <h3>Per-Call vs Deliberately Shared State</h3>

    <div class="comparison">
      <section>
        <strong>Per-call refs</strong>
        <p>{{ independentFirst.count }} / {{ independentSecond.count }}</p>
        <button type="button" @click="independentFirst.increment">
          Increment first only
        </button>
      </section>

      <section>
        <strong>Module-scope ref</strong>
        <p>{{ sharedFirst.count }} / {{ sharedSecond.count }}</p>
        <button type="button" @click="sharedFirst.increment">
          Increment shared source
        </button>
      </section>
    </div>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.2rem;
  border: 1px solid #e0d0cf;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #96544f;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.85rem;
}

.comparison {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.comparison section {
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: #fbf4f3;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #b17c77;
  border-radius: 0.4rem;
  background: #ffffff;
  cursor: pointer;
}

@media (max-width: 520px) {
  .comparison {
    grid-template-columns: 1fr;
  }
}
</style>
