<script setup lang="ts">
import { computed, ref, watch } from "vue";
import BaseModal from "../../chapter-03-component-communication/component-library-lab/BaseModal.vue";
import { useAsyncState } from "../composables/useAsyncState";
import { useDebouncedRef } from "../composables/useDebouncedRef";
import {
  useFormState,
  type FormErrors,
} from "../composables/useFormState";
import { useModal } from "../composables/useModal";
import { usePagination } from "../composables/usePagination";
import {
  usePermission,
  type PermissionName,
  type UserRole,
} from "../composables/usePermission";
import { useQueryState } from "../composables/useQueryState";

type DemoRecord = {
  id: number;
  name: string;
  category: "component" | "reactivity" | "tooling";
};

type DemoFormValues = {
  name: string;
  email: string;
};

const records: DemoRecord[] = [
  { id: 1, name: "Props boundary", category: "component" },
  { id: 2, name: "Emit payload", category: "component" },
  { id: 3, name: "Scoped slots", category: "component" },
  { id: 4, name: "Reactive refs", category: "reactivity" },
  { id: 5, name: "Computed values", category: "reactivity" },
  { id: 6, name: "Watch cleanup", category: "reactivity" },
  { id: 7, name: "Effect scopes", category: "reactivity" },
  { id: 8, name: "SFC compiler", category: "tooling" },
  { id: 9, name: "Vite module graph", category: "tooling" },
  { id: 10, name: "vue-tsc diagnostics", category: "tooling" },
];

const searchQuery = useDebouncedRef("", 300);
const {
  query,
  serializedQuery,
  setQueryParam,
  reset: resetQuery,
} = useQueryState({ category: "all" });

const filteredRecords = computed(() => {
  const normalizedSearch = searchQuery.value.trim().toLowerCase();
  const selectedCategory = query.value.category ?? "all";

  return records.filter((record) => {
    const matchesSearch = record.name
      .toLowerCase()
      .includes(normalizedSearch);
    const matchesCategory =
      selectedCategory === "all" ||
      record.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
});

const {
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  canGoPrevious,
  canGoNext,
  previousPage,
  nextPage,
  goToPage,
} = usePagination({
  totalItems: () => filteredRecords.value.length,
  pageSize: 3,
});

const visibleRecords = computed(() =>
  filteredRecords.value.slice(startIndex.value, endIndex.value),
);

watch(
  [searchQuery, () => query.value.category],
  () => {
    goToPage(1);
  },
);

const { isOpen, open, close } = useModal();

const role = ref<UserRole>("editor");
const permissions = ref<PermissionName[]>([
  "records:read",
  "records:edit",
]);
const { can, canAny, canAll } = usePermission({
  role,
  permissions,
});

function validateForm(values: DemoFormValues): FormErrors {
  const nextErrors: FormErrors = {};

  if (values.name.trim().length < 2) {
    nextErrors.name = "Name must contain at least two characters.";
  }

  if (!values.email.includes("@")) {
    nextErrors.email = "Email must contain an at sign.";
  }

  return nextErrors;
}

const {
  values,
  touched,
  errors,
  setFieldValue,
  setFieldTouched,
  validateForm: validateCurrentForm,
  reset: resetForm,
} = useFormState<DemoFormValues>(
  {
    name: "",
    email: "",
  },
  validateForm,
);

const formStatus = ref("Form has not been submitted.");

function updateFormField(
  field: keyof DemoFormValues,
  event: Event,
): void {
  const input = event.currentTarget;

  if (input instanceof HTMLInputElement) {
    setFieldValue(field, input.value);
  }
}

function submitForm(): void {
  setFieldTouched("name");
  setFieldTouched("email");
  formStatus.value = validateCurrentForm()
    ? `Saved ${values.value.name}.`
    : "Fix validation errors before saving.";
}

function wait(duration: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

const {
  data: resourceSummary,
  error: resourceError,
  status: resourceStatus,
  execute: loadResource,
} = useAsyncState(async () => {
  await wait(350);
  return `${filteredRecords.value.length} local records are available.`;
});

function updateCategory(event: Event): void {
  const select = event.currentTarget;

  if (select instanceof HTMLSelectElement) {
    setQueryParam("category", select.value);
  }
}
</script>

<template>
  <section class="kit" aria-labelledby="composables-kit-title">
    <header>
      <p class="topic">Final integration</p>
      <h3 id="composables-kit-title">Vue Composables Kit</h3>
      <p>
        Components keep rendering responsibility while composables own
        reusable state transitions, derived values, and resource lifecycles.
      </p>
    </header>

    <div class="control-grid">
      <label>
        Debounced search
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search local records"
        />
      </label>

      <label>
        Query category
        <select
          :value="query.category"
          @change="updateCategory"
        >
          <option value="all">All</option>
          <option value="component">Component</option>
          <option value="reactivity">Reactivity</option>
          <option value="tooling">Tooling</option>
        </select>
      </label>
    </div>

    <p>Serialized query: {{ serializedQuery || "(empty)" }}</p>
    <button type="button" @click="resetQuery">Reset query state</button>

    <ul class="record-list">
      <li v-for="record in visibleRecords" :key="record.id">
        <strong>{{ record.name }}</strong>
        <span>{{ record.category }}</span>
      </li>
    </ul>

    <div class="pagination">
      <button
        type="button"
        :disabled="!canGoPrevious"
        @click="previousPage"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button type="button" :disabled="!canGoNext" @click="nextPage">
        Next
      </button>
    </div>

    <section class="panel">
      <h4>Permission display logic</h4>
      <label>
        Current role
        <select v-model="role">
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <p>Can edit: {{ can("records:edit") }}</p>
      <p>
        Can read or delete:
        {{ canAny(["records:read", "records:delete"]) }}
      </p>
      <p>
        Can read and delete:
        {{ canAll(["records:read", "records:delete"]) }}
      </p>
    </section>

    <section class="panel">
      <h4>Form state</h4>
      <label>
        Name
        <input
          :value="values.name"
          type="text"
          @input="updateFormField('name', $event)"
          @blur="setFieldTouched('name')"
        />
      </label>
      <p v-if="touched.name && errors.name" class="error">
        {{ errors.name }}
      </p>
      <label>
        Email
        <input
          :value="values.email"
          type="email"
          @input="updateFormField('email', $event)"
          @blur="setFieldTouched('email')"
        />
      </label>
      <p v-if="touched.email && errors.email" class="error">
        {{ errors.email }}
      </p>
      <div class="actions">
        <button type="button" @click="submitForm">Validate form</button>
        <button type="button" @click="resetForm">Reset form</button>
      </div>
      <p>{{ formStatus }}</p>
    </section>

    <section class="panel">
      <h4>Async resource state</h4>
      <p>Status: {{ resourceStatus }}</p>
      <p v-if="resourceSummary">{{ resourceSummary }}</p>
      <p v-if="resourceError" class="error">
        {{ resourceError.message }}
      </p>
      <button type="button" @click="loadResource">
        Load local summary
      </button>
    </section>

    <button type="button" class="modal-action" @click="open">
      Open modal through useModal
    </button>

    <BaseModal v-model="isOpen">
      <template #header>
        <h4 id="library-modal-title">Logic extracted from the component</h4>
      </template>
      <p>
        BaseModal still owns rendering and model communication.
        useModal owns reusable open, close, and toggle transitions.
      </p>
      <template #footer>
        <button type="button" @click="close">Close</button>
      </template>
    </BaseModal>
  </section>
</template>

<style scoped>
.kit {
  display: grid;
  gap: 1rem;
  padding: 1.4rem;
  border: 2px solid #72977e;
  border-radius: 1rem;
  background: #f5faf6;
}

.topic {
  margin: 0;
  color: #286c45;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.5rem;
}

h4 {
  margin: 0 0 0.65rem;
}

.control-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
}

label {
  display: grid;
  gap: 0.35rem;
  font-weight: 700;
}

input,
select {
  width: 100%;
  padding: 0.55rem;
  border: 1px solid #88a591;
  border-radius: 0.4rem;
  background: #ffffff;
}

button {
  width: fit-content;
  padding: 0.48rem 0.7rem;
  border: 1px solid #568567;
  border-radius: 0.42rem;
  background: #ffffff;
  color: #285b3a;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.record-list {
  display: grid;
  gap: 0.45rem;
  min-height: 8rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.record-list li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.65rem;
  border-radius: 0.45rem;
  background: #ffffff;
}

.pagination,
.actions {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.panel {
  padding: 1rem;
  border: 1px solid #c9d9cd;
  border-radius: 0.65rem;
  background: #ffffff;
}

.panel label + p {
  margin-bottom: 0.35rem;
}

.error {
  color: #b42318;
}

.modal-action {
  background: #2f7048;
  color: #ffffff;
}
</style>
