<script setup lang="ts">
import { useTemplateRef } from "vue";
import { useClickOutside } from "../composables/useClickOutside";
import { useToggle } from "../composables/useToggle";

const popoverElement =
  useTemplateRef<HTMLElement>("click-outside-popover");
const {
  value: popoverOpen,
  setTrue: openPopover,
  setFalse: closePopover,
} = useToggle(false);

useClickOutside(popoverElement, closePopover);
</script>

<template>
  <article class="demo-card">
    <p class="topic">DOM resource cleanup</p>
    <h3>Click Outside Boundary</h3>
    <button type="button" @click="openPopover">Open popover</button>
    <section
      v-if="popoverOpen"
      ref="click-outside-popover"
      class="popover"
      tabindex="-1"
    >
      <strong>Composable-owned listener</strong>
      <p>Click outside this panel to close it.</p>
      <button type="button" @click="closePopover">Close directly</button>
    </section>
  </article>
</template>

<style scoped>
.demo-card {
  position: relative;
  min-height: 13rem;
  padding: 1.2rem;
  border: 1px solid #c9d8d3;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #2d755c;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.85rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #6a9d89;
  border-radius: 0.4rem;
  background: #eff8f4;
  cursor: pointer;
}

.popover {
  position: absolute;
  z-index: 2;
  top: 7rem;
  left: 1.2rem;
  width: min(260px, calc(100% - 2.4rem));
  padding: 0.85rem;
  border: 1px solid #559078;
  border-radius: 0.55rem;
  background: #ffffff;
  box-shadow: 0 0.8rem 2rem rgba(31, 76, 59, 0.2);
}
</style>
