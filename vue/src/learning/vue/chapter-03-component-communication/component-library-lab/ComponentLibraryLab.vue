<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  useTemplateRef,
} from "vue";
import BaseButton from "./BaseButton.vue";
import BaseModal from "./BaseModal.vue";
import BaseSelect from "./BaseSelect.vue";
import BaseTabs from "./BaseTabs.vue";
import DataTable from "./DataTable.vue";
import FormField from "./FormField.vue";
import ToastProvider from "./ToastProvider.vue";

type TabItem = {
  id: string;
  label: string;
};

type TableColumn = {
  key: string;
  label: string;
};

type TableRow = {
  id: string;
  [key: string]: string | number | boolean;
};

type SelectOption = {
  value: string;
  label: string;
};

const tabs: TabItem[] = [
  { id: "contracts", label: "Contracts" },
  { id: "ownership", label: "Ownership" },
  { id: "rendering", label: "Rendering" },
];

const columns: TableColumn[] = [
  { key: "component", label: "Component" },
  { key: "boundary", label: "Primary boundary" },
  { key: "status", label: "Status" },
];

const rows: TableRow[] = [
  {
    id: "modal",
    component: "BaseModal",
    boundary: "v-model and slots",
    status: "Ready",
  },
  {
    id: "table",
    component: "DataTable",
    boundary: "props and scoped slot",
    status: "Ready",
  },
  {
    id: "toast",
    component: "ToastProvider",
    boundary: "provide and inject",
    status: "Ready",
  },
];

const options: SelectOption[] = [
  { value: "props", label: "Props" },
  { value: "emits", label: "Emits" },
  { value: "slots", label: "Slots" },
];

const modalOpen = ref(false);
const activeTabId = ref("contracts");
const selectedBoundary = ref("props");
const fieldValue = ref("");
const lastAction = ref("No component event received.");
const mountStatus = ref("Waiting for mount.");
const labRoot = useTemplateRef<HTMLElement>("lab-root");

function recordActivation(event: MouseEvent): void {
  lastAction.value = `BaseButton emitted activate from ${event.type}.`;
}

onMounted(() => {
  mountStatus.value = labRoot.value
    ? "Component library root is mounted."
    : "Component library root is unavailable.";
});

onUpdated(() => {
  console.info("ComponentLibraryLab updated");
});

onUnmounted(() => {
  console.info("ComponentLibraryLab unmounted");
});
</script>

<template>
  <ToastProvider v-slot="{ addToast }">
    <section ref="lab-root" class="library-lab" aria-labelledby="library-title">
      <header>
        <p class="eyebrow">Final integration</p>
        <h3 id="library-title">Vue Component Library Lab</h3>
        <p>
          Small reusable APIs make ownership, rendering, and event boundaries
          visible without becoming a complete design system.
        </p>
      </header>

      <div class="toolbar">
        <BaseButton
          id="library-primary-action"
          aria-label="Record typed button event"
          @activate="recordActivation"
        >
          Emit typed event
        </BaseButton>
        <BaseButton variant="secondary" @activate="modalOpen = true">
          Open model-driven modal
        </BaseButton>
        <BaseButton
          class="toast-provider-action"
          variant="secondary"
          @activate="addToast(`Selected boundary: ${selectedBoundary}`)"
        >
          Add injected toast
        </BaseButton>
      </div>

      <p class="status">{{ lastAction }}</p>
      <p class="status">{{ mountStatus }}</p>

      <BaseTabs v-model="activeTabId" :tabs="tabs">
        <template #panel="{ activeTab }">
          <strong>{{ activeTab.label }}</strong>
          is rendered from a parent-owned scoped slot.
        </template>
      </BaseTabs>

      <div class="form-grid">
        <FormField
          id="library-boundary"
          label="Communication boundary"
        >
          <BaseSelect
            id="library-boundary"
            v-model="selectedBoundary"
            :options="options"
          />
          <template #hint>
            The field composes a control but does not own its value.
          </template>
        </FormField>

        <FormField
          id="library-note"
          label="Parent-owned note"
          :error="fieldValue.length > 0 && fieldValue.length < 4
            ? 'Use at least four characters.'
            : undefined"
        >
          <input
            id="library-note"
            v-model="fieldValue"
            type="text"
            placeholder="Write a short note"
          />
          <template #hint>
            Native input state remains in ComponentLibraryLab.
          </template>
        </FormField>
      </div>

      <DataTable :columns="columns" :rows="rows">
        <template #cell="{ column, value }">
          <strong v-if="column.key === 'status'">{{ value }}</strong>
          <span v-else>{{ value }}</span>
        </template>
      </DataTable>

      <BaseModal v-model="modalOpen">
        <template #header>
          <h4 id="library-modal-title">Reusable modal contract</h4>
        </template>
        <p>
          The parent owns visibility. The modal updates it through its model
          contract and renders parent-owned content through slots.
        </p>
        <template #footer>
          <BaseButton variant="secondary" @activate="modalOpen = false">
            Finish
          </BaseButton>
        </template>
      </BaseModal>
    </section>
  </ToastProvider>
</template>

<style scoped>
.library-lab {
  display: grid;
  gap: 1rem;
  padding: 1.4rem;
  border: 2px solid #9ab0d3;
  border-radius: 1rem;
  background: #f8faff;
}

.library-lab h3 {
  margin: 0.35rem 0 0.5rem;
}

.library-lab header p:last-child {
  max-width: 780px;
  margin-bottom: 0;
}

.eyebrow {
  margin: 0;
  color: #315a9e;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.status {
  margin: 0;
  color: #415672;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.form-grid input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.55rem 0.65rem;
  border: 1px solid #9aa9bf;
  border-radius: 0.45rem;
  font: inherit;
}
</style>
