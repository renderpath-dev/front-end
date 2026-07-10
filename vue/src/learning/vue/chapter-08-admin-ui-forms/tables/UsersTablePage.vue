<script setup lang="ts">
import { computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useAdminPagination } from "../composables/useAdminPagination";
import { useAdminTableQuery } from "../composables/useAdminTableQuery";
import { useDialogFormState } from "../composables/useDialogFormState";
import { useLocalCrudCollection } from "../composables/useLocalCrudCollection";
import { createAdminUsers } from "../contracts/adminMockData";
import type { AdminUser } from "../contracts/adminUiTypes";
import type { UserFormModel } from "../contracts/formContracts";
import type { TableColumnKey } from "../contracts/tableContracts";
import EditDialog from "../forms/EditDialog.vue";
import SearchForm from "../forms/SearchForm.vue";
import PermissionButton from "../permissions/PermissionButton.vue";
import DataTablePage from "./DataTablePage.vue";

let userSequence = 200;

function createUserDraft(): UserFormModel {
  return {
    id: "",
    name: "",
    email: "",
    department: "",
    role: "operator",
    status: "active",
  };
}

function cloneUser(user: AdminUser | UserFormModel): UserFormModel {
  return { ...user };
}

const users = useLocalCrudCollection(createAdminUsers(), cloneUser);
const tableQuery = useAdminTableQuery("uiUser");
const dialog = useDialogFormState<AdminUser, UserFormModel>(
  createUserDraft,
  cloneUser,
);

const columns: ReadonlyArray<{
  key: TableColumnKey & keyof AdminUser;
  label: string;
  sortable?: boolean;
}> = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "department", label: "Department" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status", sortable: true },
];

const filteredRows = computed(() => {
  const keyword = tableQuery.query.value.search.keyword.toLowerCase();
  const status = tableQuery.query.value.search.status;
  const rows = users.items.value.filter((user) => {
    const matchesKeyword =
      keyword.length === 0 ||
      [user.name, user.email, user.department].some((value) =>
        value.toLowerCase().includes(keyword),
      );
    return matchesKeyword && (status.length === 0 || user.status === status);
  });
  const sorting = tableQuery.query.value.sorting;

  if (sorting.order === "") {
    return rows;
  }

  const direction = sorting.order === "ascending" ? 1 : -1;
  return [...rows].sort((left, right) => {
    const leftValue =
      sorting.sort === "email"
        ? left.email
        : sorting.sort === "status"
          ? left.status
          : left.name;
    const rightValue =
      sorting.sort === "email"
        ? right.email
        : sorting.sort === "status"
          ? right.status
          : right.name;
    return leftValue.localeCompare(rightValue) * direction;
  });
});

const pagination = useAdminPagination(
  filteredRows,
  () => tableQuery.query.value.pagination,
);

function commitUser(
  draft: UserFormModel,
  mode: "create" | "edit",
  sourceId: string | null,
): void {
  if (mode === "create") {
    userSequence += 1;
    users.create({
      ...draft,
      id: `user-${userSequence}`,
    });
    ElMessage.success("User created in the local collection");
    return;
  }

  if (sourceId) {
    users.update(sourceId, {
      ...draft,
      id: sourceId,
    });
    ElMessage.success("User updated in the local collection");
  }
}

function submitDialog(): void {
  dialog.submit(commitUser);
}

async function removeUser(user: AdminUser): Promise<void> {
  try {
    await ElMessageBox.confirm(
      `Delete ${user.name} from the local collection?`,
      "Confirm delete",
      { type: "warning" },
    );
    users.delete(user.id);
    ElMessage.success("User deleted from the local collection");
  } catch {
    ElMessage.info("Delete cancelled");
  }
}
</script>

<template>
  <section class="table-page">
    <SearchForm
      :model-value="tableQuery.query.value.search"
      :status-options="['active', 'suspended']"
      @reset="tableQuery.reset"
      @submit="tableQuery.setSearch"
    />
    <DataTablePage
      title="User management"
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
        <PermissionButton permission="users:create" @click="dialog.openCreate">
          Create user
        </PermissionButton>
      </template>
      <template #operations="{ row }">
        <PermissionButton
          permission="users:edit"
          @click="dialog.openEdit(row.id, row)"
        >
          Edit
        </PermissionButton>
        <PermissionButton
          button-type="danger"
          permission="users:delete"
          @click="removeUser(row)"
        >
          Delete
        </PermissionButton>
      </template>
    </DataTablePage>

    <EditDialog
      v-model:visible="dialog.visible.value"
      v-model:draft="dialog.draft.value"
      :mode="dialog.mode.value"
      @close="dialog.close"
      @submit="submitDialog"
    />
  </section>
</template>

<style scoped>
.table-page {
  display: grid;
  gap: 1rem;
}
</style>
