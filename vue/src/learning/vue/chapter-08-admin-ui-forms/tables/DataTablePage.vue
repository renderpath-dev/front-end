<script
  setup
  lang="ts"
  generic="Row extends { id: string }, ColumnKey extends keyof Row & string"
>
import type { TableSortState } from "../contracts/tableContracts";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { usePreferenceStore } from "../../chapter-07-pinia-state-management/stores/preferenceStore";

const preferenceStore = usePreferenceStore();
const { tableDensity } = storeToRefs(preferenceStore);
const tableSize = computed(() =>
  tableDensity.value === "compact" ? "small" : "default",
);

defineProps<{
  title: string;
  rows: ReadonlyArray<Row>;
  columns: ReadonlyArray<{
    key: ColumnKey;
    label: string;
    sortable?: boolean;
  }>;
  total: number;
  page: number;
  pageSize: number;
}>();

const emit = defineEmits<{
  pageChange: [page: number];
  pageSizeChange: [pageSize: number];
  sortChange: [sorting: TableSortState];
  selectionChange: [rows: ReadonlyArray<Row>];
}>();

defineSlots<{
  toolbar(): unknown;
  operations(props: { row: Row }): unknown;
}>();

function sortChange(payload: {
  prop: string;
  order: "ascending" | "descending" | null;
}): void {
  emit("sortChange", {
    sort: payload.prop,
    order: payload.order ?? "",
  });
}
</script>

<template>
  <ElCard shadow="never">
    <template #header>
      <div class="card-header">
        <strong>{{ title }}</strong>
        <slot name="toolbar" />
      </div>
    </template>

    <ElTable
      :data="rows"
      row-key="id"
      :size="tableSize"
      stripe
      @selection-change="emit('selectionChange', $event)"
      @sort-change="sortChange"
    >
      <ElTableColumn type="selection" width="48" />
      <ElTableColumn
        v-for="column in columns"
        :key="column.key"
        :label="column.label"
        :prop="column.key"
        :sortable="column.sortable ? 'custom' : false"
        min-width="120"
      />
      <ElTableColumn label="Operations" fixed="right" width="190">
        <template #default="{ row }">
          <slot name="operations" :row="row" />
        </template>
      </ElTableColumn>
    </ElTable>

    <ElPagination
      class="pagination"
      :current-page="page"
      :page-size="pageSize"
      :page-sizes="[5, 10, 20]"
      :total="total"
      layout="total, sizes, prev, pager, next"
      @update:current-page="emit('pageChange', $event)"
      @update:page-size="emit('pageSizeChange', $event)"
    />
  </ElCard>
</template>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.pagination {
  justify-content: flex-end;
  margin-top: 1rem;
}
</style>
