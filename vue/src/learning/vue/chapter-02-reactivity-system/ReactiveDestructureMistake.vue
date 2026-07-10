<script setup lang="ts">
import { reactive, toRef } from "vue";

type ThemeName = "light" | "dark";

const settings = reactive({
  theme: "light" as ThemeName,
  fontSize: 16,
});
const { theme } = settings;
const themeRef = toRef(settings, "theme");

function toggleTheme(): void {
  settings.theme = settings.theme === "light" ? "dark" : "light";
}

function increaseFontSize(): void {
  settings.fontSize += 1;
}
</script>

<template>
  <article class="demo-card">
    <p class="topic">reactive destructuring</p>
    <h3>Snapshot versus connected property ref</h3>

    <div class="comparison">
      <p>
        Destructured snapshot:
        <strong>{{ theme }}</strong>
      </p>
      <p>
        Direct proxy access:
        <strong>{{ settings.theme }}</strong>
      </p>
      <p>
        Connected toRef:
        <strong>{{ themeRef }}</strong>
      </p>
      <p>
        Direct font size:
        <strong>{{ settings.fontSize }}px</strong>
      </p>
    </div>

    <div class="actions">
      <button type="button" @click="toggleTheme">Toggle source theme</button>
      <button type="button" @click="increaseFontSize">Increase font size</button>
    </div>

    <p class="note">
      The destructured <code>theme</code> is a plain string snapshot.
      <code>themeRef</code> and direct <code>settings.theme</code> access still
      pass through the reactive source.
    </p>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.25rem;
  border: 1px solid #e1cccc;
  border-radius: 0.9rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #9a3f3f;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 1rem;
}

.comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 0.6rem;
}

.comparison p {
  margin: 0;
  padding: 0.7rem;
  border-radius: 0.6rem;
  background: #fcf4f4;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

button {
  padding: 0.55rem 0.75rem;
  border: 1px solid #cc9e9e;
  border-radius: 0.5rem;
  background: #fff3f3;
  color: #7b3030;
  cursor: pointer;
}

.note {
  margin-bottom: 0;
  color: #685858;
  line-height: 1.6;
}
</style>
