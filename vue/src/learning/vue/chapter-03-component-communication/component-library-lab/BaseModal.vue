<script setup lang="ts">
const open = defineModel<boolean>({ required: true });
</script>

<template>
  <div v-if="open" class="modal-backdrop" role="presentation">
    <section
      class="modal-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="library-modal-title"
    >
      <header class="modal-header">
        <slot name="header" />
        <button
          type="button"
          class="close-button"
          aria-label="Close modal"
          @click="open = false"
        >
          Close
        </button>
      </header>
      <div class="modal-body">
        <slot />
      </div>
      <footer class="modal-footer">
        <slot name="footer" />
      </footer>
    </section>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  z-index: 20;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(23, 35, 58, 0.58);
}

.modal-panel {
  width: min(520px, 100%);
  padding: 1.25rem;
  border-radius: 0.9rem;
  background: #ffffff;
  box-shadow: 0 1.5rem 4rem rgba(23, 35, 58, 0.3);
}

.modal-header,
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.modal-body {
  padding: 1rem 0;
}

.close-button {
  padding: 0.4rem 0.6rem;
  border: 1px solid #9ba9c1;
  border-radius: 0.4rem;
  background: #ffffff;
  cursor: pointer;
}
</style>
