<script setup lang="ts">
import { computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useAdminPagination } from "../composables/useAdminPagination";
import { useAdminTableQuery } from "../composables/useAdminTableQuery";
import { useDrawerFormState } from "../composables/useDrawerFormState";
import { useLocalCrudCollection } from "../composables/useLocalCrudCollection";
import { createAdminProducts } from "../contracts/adminMockData";
import type { AdminProduct } from "../contracts/adminUiTypes";
import type { ProductFormModel } from "../contracts/formContracts";
import type { TableColumnKey } from "../contracts/tableContracts";
import EditDrawer from "../forms/EditDrawer.vue";
import SearchForm from "../forms/SearchForm.vue";
import PermissionButton from "../permissions/PermissionButton.vue";
import DataTablePage from "./DataTablePage.vue";

let productSequence = 300;

function createProductDraft(): ProductFormModel {
  return {
    id: "",
    name: "",
    category: "",
    price: 0,
    stock: 0,
    status: "draft",
  };
}

function cloneProduct(
  product: AdminProduct | ProductFormModel,
): ProductFormModel {
  return { ...product };
}

const products = useLocalCrudCollection(createAdminProducts(), cloneProduct);
const tableQuery = useAdminTableQuery("uiProduct");
const drawer = useDrawerFormState<AdminProduct, ProductFormModel>(
  createProductDraft,
  cloneProduct,
);

const columns: ReadonlyArray<{
  key: TableColumnKey & keyof AdminProduct;
  label: string;
  sortable?: boolean;
}> = [
  { key: "name", label: "Name", sortable: true },
  { key: "category", label: "Category" },
  { key: "price", label: "Price", sortable: true },
  { key: "stock", label: "Stock", sortable: true },
  { key: "status", label: "Status" },
];

const filteredRows = computed(() => {
  const keyword = tableQuery.query.value.search.keyword.toLowerCase();
  const status = tableQuery.query.value.search.status;
  const rows = products.items.value.filter((product) => {
    const matchesKeyword =
      keyword.length === 0 ||
      [product.name, product.category].some((value) =>
        value.toLowerCase().includes(keyword),
      );
    return matchesKeyword && (status.length === 0 || product.status === status);
  });
  const sorting = tableQuery.query.value.sorting;
  if (sorting.order === "") {
    return rows;
  }

  const direction = sorting.order === "ascending" ? 1 : -1;
  return [...rows].sort((left, right) => {
    if (sorting.sort === "price" || sorting.sort === "stock") {
      return (left[sorting.sort] - right[sorting.sort]) * direction;
    }
    return left.name.localeCompare(right.name) * direction;
  });
});

const pagination = useAdminPagination(
  filteredRows,
  () => tableQuery.query.value.pagination,
);

function commitProduct(
  draft: ProductFormModel,
  mode: "create" | "edit",
  sourceId: string | null,
): void {
  if (mode === "create") {
    productSequence += 1;
    products.create({
      ...draft,
      id: `product-${productSequence}`,
    });
    ElMessage.success("Product created in the local collection");
    return;
  }

  if (sourceId) {
    products.update(sourceId, {
      ...draft,
      id: sourceId,
    });
    ElMessage.success("Product updated in the local collection");
  }
}

function submitDrawer(): void {
  drawer.submit(commitProduct);
}

async function removeProduct(product: AdminProduct): Promise<void> {
  try {
    await ElMessageBox.confirm(
      `Delete ${product.name} from the local collection?`,
      "Confirm delete",
      { type: "warning" },
    );
    products.delete(product.id);
    ElMessage.success("Product deleted from the local collection");
  } catch {
    ElMessage.info("Delete cancelled");
  }
}
</script>

<template>
  <section class="table-page">
    <SearchForm
      :model-value="tableQuery.query.value.search"
      :status-options="['active', 'draft']"
      @reset="tableQuery.reset"
      @submit="tableQuery.setSearch"
    />
    <DataTablePage
      title="Product management"
      :rows="pagination.visibleRows.value"
      :columns="columns"
      :total="pagination.total.value"
      :page="tableQuery.query.value.pagination.page"
      :page-size="tableQuery.query.value.pagination.pageSize"
      @page-change="tableQuery.setPage"
      @page-size-change="tableQuery.setPageSize"
      @sort-change="tableQuery.setSort"
    >
      <template #toolbar>
        <PermissionButton
          permission="products:create"
          @click="drawer.openCreate"
        >
          Create product
        </PermissionButton>
      </template>
      <template #operations="{ row }">
        <PermissionButton
          permission="products:edit"
          @click="drawer.openEdit(row.id, row)"
        >
          Edit
        </PermissionButton>
        <PermissionButton
          button-type="danger"
          permission="products:delete"
          @click="removeProduct(row)"
        >
          Delete
        </PermissionButton>
      </template>
    </DataTablePage>

    <EditDrawer
      v-model:visible="drawer.visible.value"
      v-model:draft="drawer.draft.value"
      :dirty="drawer.dirty.value"
      :mode="drawer.mode.value"
      @change="drawer.markDirty"
      @close="drawer.close"
      @submit="submitDrawer"
    />
  </section>
</template>

<style scoped>
.table-page {
  display: grid;
  gap: 1rem;
}
</style>
