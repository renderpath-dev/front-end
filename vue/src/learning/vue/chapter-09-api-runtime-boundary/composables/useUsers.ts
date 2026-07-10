import { computed, ref } from "vue";
import type { MockBackendScenario } from "../api/mockBackendScenarios";
import type { User, UserListQuery } from "../contracts/userContract";
import { listUsers } from "../services/userApi";
import { useApiResource } from "./useApiResource";

export function useUsers() {
  const query = ref<UserListQuery>({
    keyword: "",
    page: 1,
    pageSize: 5,
    sort: "id",
    order: "ascending",
  });
  const scenario = ref<MockBackendScenario>("success");
  const resource = useApiResource(() =>
    listUsers(query.value, { scenario: scenario.value }),
  );

  const users = computed<ReadonlyArray<User>>(
    () => resource.data.value?.rows ?? [],
  );
  const meta = computed(() => resource.data.value?.meta ?? null);

  function setScenario(value: MockBackendScenario): void {
    scenario.value = value;
  }

  return {
    ...resource,
    users,
    meta,
    query,
    scenario,
    reload: resource.execute,
    setScenario,
  };
}
