import { ref, type Ref } from "vue";
import type { ProductForm } from "../contracts/productContract";

export type ProductFormErrors = Partial<
  Record<keyof ProductForm, string>
>;

export type ProductFormTouched = Partial<
  Record<keyof ProductForm, boolean>
>;

export type ProductFormState = {
  values: Ref<ProductForm>;
  errors: Ref<ProductFormErrors>;
  touched: Ref<ProductFormTouched>;
  setFieldValue: <Key extends keyof ProductForm>(
    key: Key,
    value: ProductForm[Key],
  ) => void;
  setFieldTouched: (key: keyof ProductForm) => void;
  validate: () => boolean;
  reset: () => void;
};

function cloneForm(values: ProductForm): ProductForm {
  return {
    ...values,
    tags: [...values.tags],
  };
}

export function useProductForm(
  initialValues: ProductForm,
): ProductFormState {
  const values = ref<ProductForm>(cloneForm(initialValues));
  const errors = ref<ProductFormErrors>({});
  const touched = ref<ProductFormTouched>({});

  function setFieldValue<Key extends keyof ProductForm>(
    key: Key,
    value: ProductForm[Key],
  ): void {
    values.value[key] = value;
  }

  function setFieldTouched(key: keyof ProductForm): void {
    touched.value[key] = true;
  }

  function validate(): boolean {
    const nextErrors: ProductFormErrors = {};
    const numericPrice = Number(values.value.price);

    if (values.value.name.trim().length < 2) {
      nextErrors.name = "Name must contain at least two characters.";
    }

    if (
      values.value.price.trim().length === 0 ||
      !Number.isFinite(numericPrice) ||
      numericPrice < 0
    ) {
      nextErrors.price = "Price must be a non-negative number.";
    }

    errors.value = nextErrors;
    return Object.keys(nextErrors).length === 0;
  }

  function reset(): void {
    values.value = cloneForm(initialValues);
    errors.value = {};
    touched.value = {};
  }

  return {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    validate,
    reset,
  };
}
