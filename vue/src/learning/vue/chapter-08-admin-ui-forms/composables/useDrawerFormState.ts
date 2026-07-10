import { ref, shallowRef } from "vue";
import type { CrudMode } from "../contracts/adminUiTypes";
import type { FormSubmitResult } from "../contracts/formContracts";

export function useDrawerFormState<RecordValue, DraftValue>(
  createDraft: () => DraftValue,
  cloneDraft: (source: RecordValue | DraftValue) => DraftValue,
) {
  const visible = ref(false);
  const mode = ref<CrudMode>("create");
  const sourceId = ref<string | null>(null);
  const dirty = ref(false);
  const draft = shallowRef<DraftValue>(createDraft());

  function openCreate(): void {
    mode.value = "create";
    sourceId.value = null;
    dirty.value = false;
    draft.value = createDraft();
    visible.value = true;
  }

  function openEdit(id: string, source: RecordValue): void {
    mode.value = "edit";
    sourceId.value = id;
    dirty.value = false;
    draft.value = cloneDraft(source);
    visible.value = true;
  }

  function markDirty(): void {
    dirty.value = true;
  }

  function resetDraft(): void {
    draft.value = createDraft();
    sourceId.value = null;
    dirty.value = false;
  }

  function close(): void {
    visible.value = false;
    resetDraft();
  }

  function submit(
    commit: (
      value: DraftValue,
      currentMode: CrudMode,
      currentSourceId: string | null,
    ) => void,
  ): FormSubmitResult {
    commit(cloneDraft(draft.value), mode.value, sourceId.value);
    close();
    return {
      success: true,
      message: "Local drawer draft committed",
    };
  }

  return {
    visible,
    mode,
    sourceId,
    dirty,
    draft,
    openCreate,
    openEdit,
    markDirty,
    close,
    resetDraft,
    submit,
  };
}
