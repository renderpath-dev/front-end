<script setup lang="ts">
import { nextTick, ref } from "vue";

const items = ref(["Initial row"]);
const listPanel = ref<HTMLElement | null>(null);
const heightBeforePatch = ref(0);
const heightAfterPatch = ref(0);

async function addItemAndMeasure(): Promise<void> {
  heightBeforePatch.value = listPanel.value?.offsetHeight ?? 0;
  items.value.push(`Added row ${items.value.length + 1}`);

  await nextTick();

  heightAfterPatch.value = listPanel.value?.offsetHeight ?? 0;
}
</script>

<template>
  <article class="demo-card">
    <p class="topic">nextTick and template ref</p>
    <h3>Measure after the pending DOM patch</h3>

    <ul ref="listPanel">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>

    <button type="button" @click="addItemAndMeasure">
      Add row and measure
    </button>

    <dl>
      <div>
        <dt>Before pending patch</dt>
        <dd>{{ heightBeforePatch }}px</dd>
      </div>
      <div>
        <dt>After nextTick</dt>
        <dd>{{ heightAfterPatch }}px</dd>
      </div>
    </dl>

    <p class="note">
      Mutating the array schedules an update. <code>nextTick()</code> waits for
      Vue's pending DOM update flush; it does not wait for unrelated network
      work.
    </p>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.25rem;
  border: 1px solid #e3d3c3;
  border-radius: 0.9rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #9a4f12;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 1rem;
}

ul {
  display: grid;
  gap: 0.35rem;
  padding: 0.8rem 0.8rem 0.8rem 2rem;
  border-radius: 0.6rem;
  background: #fff8f1;
}

button {
  padding: 0.55rem 0.75rem;
  border: 1px solid #d0a47e;
  border-radius: 0.5rem;
  background: #fff3e8;
  color: #7b3e0e;
  cursor: pointer;
}

dl {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

dl div {
  padding: 0.7rem;
  border-radius: 0.6rem;
  background: #fff8f1;
}

dt {
  color: #766659;
  font-size: 0.8rem;
}

dd {
  margin: 0.25rem 0 0;
  font-weight: 800;
}

.note {
  margin-bottom: 0;
  color: #675e56;
  line-height: 1.6;
}
</style>
