import { ref } from "vue";
import type { FormInstance } from "element-plus";
import type { FormValidationState } from "../contracts/formContracts";

export function useElementFormValidation() {
  const formRef = ref<FormInstance>();

  async function validate(): Promise<FormValidationState> {
    if (!formRef.value) {
      return {
        valid: false,
        message: "Form instance is unavailable",
      };
    }

    try {
      await formRef.value.validate();
      return {
        valid: true,
        message: "Frontend validation passed",
      };
    } catch {
      return {
        valid: false,
        message: "Frontend validation failed",
      };
    }
  }

  function reset(): void {
    formRef.value?.resetFields();
  }

  function clear(): void {
    formRef.value?.clearValidate();
  }

  return {
    formRef,
    validate,
    reset,
    clear,
  };
}
