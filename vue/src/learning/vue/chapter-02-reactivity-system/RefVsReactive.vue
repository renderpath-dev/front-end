<script setup lang="ts">
import { reactive, ref } from "vue";

type Profile = {
  name: string;
  level: number;
};

const count = ref(0);
const profileRef = ref<Profile>({
  name: "Ada",
  level: 1,
});
const profileReactive = reactive<Profile>({
  name: "Lin",
  level: 1,
});
const lastScriptOperation = ref("No script mutation yet.");

function incrementCount(): void {
  count.value += 1;
  lastScriptOperation.value = "Script wrote count.value.";
}

function replaceRefProfile(): void {
  profileRef.value = {
    name: profileRef.value.name === "Ada" ? "Grace" : "Ada",
    level: profileRef.value.level + 1,
  };
  lastScriptOperation.value = "Script replaced profileRef.value.";
}

function mutateReactiveProfile(): void {
  profileReactive.name = profileReactive.name === "Lin" ? "Mina" : "Lin";
  profileReactive.level += 1;
  lastScriptOperation.value = "Script mutated profileReactive properties.";
}
</script>

<template>
  <article class="demo-card">
    <p class="topic">ref and reactive</p>
    <h3>Value container and proxy object</h3>

    <div class="state-grid">
      <section>
        <h4>Primitive ref</h4>
        <p>Template count: {{ count }}</p>
        <button type="button" @click="incrementCount">Increment count</button>
      </section>

      <section>
        <h4>Object ref</h4>
        <p>{{ profileRef.name }} | level {{ profileRef.level }}</p>
        <button type="button" @click="replaceRefProfile">
          Replace profileRef.value
        </button>
      </section>

      <section>
        <h4>Reactive object</h4>
        <p>{{ profileReactive.name }} | level {{ profileReactive.level }}</p>
        <button type="button" @click="mutateReactiveProfile">
          Mutate proxy properties
        </button>
      </section>
    </div>

    <p class="operation">{{ lastScriptOperation }}</p>
    <p class="note">
      Script uses <code>.value</code> for refs. The template unwraps these
      top-level refs. A reactive binding keeps its proxy identity, so this demo
      mutates its properties instead of replacing the binding.
    </p>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.25rem;
  border: 1px solid #cfded7;
  border-radius: 0.9rem;
  background: #ffffff;
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
  margin: 0.35rem 0 1rem;
}

h4 {
  margin: 0 0 0.5rem;
}

.state-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
}

.state-grid section {
  padding: 0.85rem;
  border-radius: 0.7rem;
  background: #f6faf8;
}

button {
  padding: 0.55rem 0.75rem;
  border: 1px solid #9dbbad;
  border-radius: 0.5rem;
  background: #eff8f3;
  color: #145c3a;
  cursor: pointer;
}

.operation {
  font-weight: 700;
}

.note {
  margin-bottom: 0;
  color: #53665c;
  line-height: 1.6;
}
</style>
