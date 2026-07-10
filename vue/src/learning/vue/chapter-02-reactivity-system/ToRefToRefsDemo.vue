<script setup lang="ts">
import { reactive, toRef, toRefs } from "vue";

const preferences = reactive({
  theme: "light",
  fontSize: 16,
  compactMode: false,
});

const themeRef = toRef(preferences, "theme");
const { fontSize, compactMode } = toRefs(preferences);

function toggleThemeFromRef(): void {
  themeRef.value = themeRef.value === "light" ? "dark" : "light";
}

function increaseFontFromSource(): void {
  preferences.fontSize += 1;
}

function toggleCompactFromRef(): void {
  compactMode.value = !compactMode.value;
}
</script>

<template>
  <article class="demo-card">
    <p class="topic">toRef and toRefs</p>
    <h3>Property refs preserve the source connection</h3>

    <dl>
      <div>
        <dt>Source theme</dt>
        <dd>{{ preferences.theme }}</dd>
      </div>
      <div>
        <dt>themeRef</dt>
        <dd>{{ themeRef }}</dd>
      </div>
      <div>
        <dt>fontSize ref</dt>
        <dd>{{ fontSize }}px</dd>
      </div>
      <div>
        <dt>compactMode ref</dt>
        <dd>{{ compactMode }}</dd>
      </div>
    </dl>

    <div class="actions">
      <button type="button" @click="toggleThemeFromRef">
        Write through toRef
      </button>
      <button type="button" @click="increaseFontFromSource">
        Write through source
      </button>
      <button type="button" @click="toggleCompactFromRef">
        Write through toRefs result
      </button>
    </div>

    <p class="note">
      Each returned ref points at a property on the same reactive object.
      Destructuring these refs keeps the connection; copying
      <code>preferences.theme</code> into a plain string would not.
    </p>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.25rem;
  border: 1px solid #c9d8d1;
  border-radius: 0.9rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #26705a;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 1rem;
}

dl {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.6rem;
}

dl div {
  padding: 0.7rem;
  border-radius: 0.6rem;
  background: #f1f8f5;
}

dt {
  color: #5c6d65;
  font-size: 0.8rem;
}

dd {
  margin: 0.25rem 0 0;
  font-weight: 800;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

button {
  padding: 0.55rem 0.75rem;
  border: 1px solid #98b9aa;
  border-radius: 0.5rem;
  background: #edf8f3;
  color: #1e604b;
  cursor: pointer;
}

.note {
  margin-bottom: 0;
  color: #55645d;
  line-height: 1.6;
}
</style>
