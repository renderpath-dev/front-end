<script setup lang="ts">
defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <div v-if="open" class="overlay" @click.self="emit('close')">
    <section
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="slot-modal-title"
    >
      <header>
        <slot name="header">
          <h3 id="slot-modal-title">Slot Modal</h3>
        </slot>
      </header>
      <div class="body">
        <slot />
      </div>
      <footer>
        <slot name="footer">
          <button type="button" @click="emit('close')">Close</button>
        </slot>
      </footer>
    </section>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  z-index: 20;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(23, 37, 31, 0.55);
}

.modal {
  width: min(520px, 100%);
  padding: 1rem;
  border-radius: 0.85rem;
  background: #ffffff;
  box-shadow: 0 1.5rem 4rem rgba(20, 36, 29, 0.25);
}

.body {
  padding: 0.75rem 0;
  line-height: 1.6;
}

footer {
  display: flex;
  justify-content: flex-end;
}

button {
  padding: 0.55rem 0.8rem;
  border: 1px solid #18794e;
  border-radius: 0.5rem;
  background: #18794e;
  color: #ffffff;
  cursor: pointer;
}
</style>
