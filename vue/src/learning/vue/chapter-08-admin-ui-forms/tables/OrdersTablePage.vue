<script setup lang="ts">
import { computed, ref } from "vue";
import { ElMessage } from "element-plus";
import { useAdminPagination } from "../composables/useAdminPagination";
import { useAdminTableQuery } from "../composables/useAdminTableQuery";
import { useLocalCrudCollection } from "../composables/useLocalCrudCollection";
import { createAdminOrders } from "../contracts/adminMockData";
import type { AdminOrder } from "../contracts/adminUiTypes";
import type { OrderStatusFormModel } from "../contracts/formContracts";
import type { TableColumnKey } from "../contracts/tableContracts";
import OrderStatusForm from "../forms/OrderStatusForm.vue";
import SearchForm from "../forms/SearchForm.vue";
import PermissionButton from "../permissions/PermissionButton.vue";
import DataTablePage from "./DataTablePage.vue";

const orders = useLocalCrudCollection(
  createAdminOrders(),
  (order) => ({ ...order }),
);
const tableQuery = useAdminTableQuery("uiOrder");
const statusDialogVisible = ref(false);
const statusDraft = ref<OrderStatusFormModel>({
  id: "",
  status: "pending",
});

const columns: ReadonlyArray<{
  key: TableColumnKey & keyof AdminOrder;
  label: string;
  sortable?: boolean;
}> = [
  { key: "customer", label: "Customer", sortable: true },
  { key: "total", label: "Total", sortable: true },
  { key: "status", label: "Status" },
  { key: "createdAt", label: "Created", sortable: true },
];

const filteredRows = computed(() => {
  const keyword = tableQuery.query.value.search.keyword.toLowerCase();
  const status = tableQuery.query.value.search.status;
  const rows = orders.items.value.filter((order) => {
    const matchesKeyword =
      keyword.length === 0 ||
      [order.id, order.customer].some((value) =>
        value.toLowerCase().includes(keyword),
      );
    return matchesKeyword && (status.length === 0 || order.status === status);
  });
  const sorting = tableQuery.query.value.sorting;
  if (sorting.order === "") {
    return rows;
  }

  const direction = sorting.order === "ascending" ? 1 : -1;
  return [...rows].sort((left, right) => {
    if (sorting.sort === "total") {
      return (left.total - right.total) * direction;
    }
    const leftValue =
      sorting.sort === "createdAt" ? left.createdAt : left.customer;
    const rightValue =
      sorting.sort === "createdAt" ? right.createdAt : right.customer;
    return leftValue.localeCompare(rightValue) * direction;
  });
});

const pagination = useAdminPagination(
  filteredRows,
  () => tableQuery.query.value.pagination,
);

function openStatusDialog(order: AdminOrder): void {
  statusDraft.value = {
    id: order.id,
    status: order.status,
  };
  statusDialogVisible.value = true;
}

function commitStatus(): void {
  const current = orders.items.value.find(
    (order) => order.id === statusDraft.value.id,
  );
  if (!current) {
    return;
  }

  orders.update(current.id, {
    ...current,
    status: statusDraft.value.status,
  });
  statusDialogVisible.value = false;
  ElMessage.success("Order status updated locally");
}
</script>

<template>
  <section class="table-page">
    <SearchForm
      :model-value="tableQuery.query.value.search"
      :status-options="['pending', 'processing', 'completed', 'cancelled']"
      @reset="tableQuery.reset"
      @submit="tableQuery.setSearch"
    />
    <DataTablePage
      title="Order management"
      :rows="pagination.visibleRows.value"
      :columns="columns"
      :total="pagination.total.value"
      :page="tableQuery.query.value.pagination.page"
      :page-size="tableQuery.query.value.pagination.pageSize"
      @page-change="tableQuery.setPage"
      @page-size-change="tableQuery.setPageSize"
      @sort-change="tableQuery.setSort"
    >
      <template #operations="{ row }">
        <PermissionButton
          permission="orders:status"
          @click="openStatusDialog(row)"
        >
          Set status
        </PermissionButton>
      </template>
    </DataTablePage>

    <ElDialog
      v-model="statusDialogVisible"
      title="Update order status"
      width="min(460px, 92vw)"
    >
      <OrderStatusForm
        v-model="statusDraft"
        @cancel="statusDialogVisible = false"
        @submit="commitStatus"
      />
    </ElDialog>
  </section>
</template>

<style scoped>
.table-page {
  display: grid;
  gap: 1rem;
}
</style>
