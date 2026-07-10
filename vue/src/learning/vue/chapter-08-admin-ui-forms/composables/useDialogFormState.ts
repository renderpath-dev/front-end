import { ref, shallowRef } from "vue";
import type { CrudMode } from "../contracts/adminUiTypes";
import type { FormSubmitResult } from "../contracts/formContracts";

export function useDialogFormState<RecordValue, DraftValue>(
  createDraft: () => DraftValue,
  cloneDraft: (source: RecordValue | DraftValue) => DraftValue,
) {
  const visible = ref(false);
  const mode = ref<CrudMode>("create");
  const sourceId = ref<string | null>(null);
  const draft = shallowRef<DraftValue>(createDraft());

  function openCreate(): void {
    mode.value = "create";
    sourceId.value = null;
    draft.value = createDraft();
    visible.value = true;
  }

  function openEdit(id: string, source: RecordValue): void {
    mode.value = "edit";
    sourceId.value = id;
    draft.value = cloneDraft(source);
    visible.value = true;
  }

  function resetDraft(): void {
    draft.value = createDraft();
    sourceId.value = null;
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
      message: "Local draft committed",
    };
  }

  return {
    visible,
    mode,
    sourceId,
    draft,
    openCreate,
    openEdit,
    close,
    resetDraft,
    submit,
  };
}
