<script setup lang="ts">
import { reactive, watch } from "vue";
import type { TableSearchState } from "../contracts/tableContracts";

const props = defineProps<{
  modelValue: TableSearchState;
  statusOptions: ReadonlyArray<string>;
}>();

const emit = defineEmits<{
  submit: [value: TableSearchState];
  reset: [];
}>();

const draft = reactive<TableSearchState>({
  keyword: "",
  status: "",
});

watch(
  () => props.modelValue,
  (value) => {
    draft.keyword = value.keyword;
    draft.status = value.status;
  },
  { immediate: true, deep: true },
);

function submit(): void {
  emit("submit", { ...draft });
}

function reset(): void {
  draft.keyword = "";
  draft.status = "";
  emit("reset");
}
</script>

<template>
  <ElForm class="search-form" :inline="true" @submit.prevent="submit">
    <ElFormItem label="Keyword">
      <ElInput
        v-model="draft.keyword"
        clearable
        placeholder="Search records"
      />
    </ElFormItem>
    <ElFormItem label="Status">
      <ElSelect
        v-model="draft.status"
        clearable
        placeholder="All statuses"
      >
        <ElOption
          v-for="status in statusOptions"
          :key="status"
          :label="status"
          :value="status"
        />
      </ElSelect>
    </ElFormItem>
    <ElFormItem>
      <ElButton native-type="submit" type="primary">Search</ElButton>
      <ElButton @click="reset">Reset</ElButton>
    </ElFormItem>
  </ElForm>
</template>

<style scoped>
.search-form {
  padding: 0.85rem;
  border-radius: 0.65rem;
  background: var(--admin-surface-muted);
}
</style>
