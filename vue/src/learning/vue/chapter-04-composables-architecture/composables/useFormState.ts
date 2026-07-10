import { ref, type Ref } from "vue";

export type FormValues = Record<string, string>;
export type FormErrors = Partial<Record<string, string>>;
export type TouchedFields<T extends FormValues> = Partial<
  Record<keyof T, boolean>
>;

export type FormState<T extends FormValues> = {
  values: Ref<T>;
  touched: Ref<TouchedFields<T>>;
  errors: Ref<FormErrors>;
  setFieldValue: <Key extends keyof T>(
    field: Key,
    value: T[Key],
  ) => void;
  setFieldTouched: (field: keyof T) => void;
  validateForm: () => boolean;
  reset: () => void;
};

export function useFormState<T extends FormValues>(
  initialValues: T,
  validate: (values: T) => FormErrors = () => ({}),
): FormState<T> {
  const values = ref({ ...initialValues }) as Ref<T>;
  const touched = ref<TouchedFields<T>>({});
  const errors = ref<FormErrors>({});

  function setFieldValue<Key extends keyof T>(
    field: Key,
    value: T[Key],
  ): void {
    values.value[field] = value;
  }

  function setFieldTouched(field: keyof T): void {
    touched.value[field] = true;
  }

  function validateForm(): boolean {
    const nextErrors = validate(values.value);
    errors.value = nextErrors;
    return Object.keys(nextErrors).length === 0;
  }

  function reset(): void {
    values.value = { ...initialValues };
    touched.value = {};
    errors.value = {};
  }

  return {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    validateForm,
    reset,
  };
}
