import { computed, ref } from "vue";
import type { AdminTab } from "../contracts/adminUiTypes";

const defaultTabs: ReadonlyArray<AdminTab> = [
  { id: "dashboard", label: "Dashboard", closable: false },
  { id: "users", label: "Users", closable: false },
  { id: "roles", label: "Roles", closable: false },
  { id: "products", label: "Products", closable: false },
  { id: "orders", label: "Orders", closable: false },
  { id: "upload", label: "Upload", closable: false },
];

export function useAdminTabs() {
  const activeId = ref<AdminTab["id"]>("dashboard");
  const tabs = computed<ReadonlyArray<AdminTab>>(() => defaultTabs);

  function setActive(id: AdminTab["id"]): void {
    activeId.value = id;
  }

  return {
    tabs,
    activeId,
    setActive,
  };
}
