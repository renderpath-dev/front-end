import { ref, type Ref } from "vue";

export type ToggleState = {
  value: Ref<boolean>;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  setValue: (nextValue: boolean) => void;
};

export function useToggle(initialValue = false): ToggleState {
  const value = ref(initialValue);

  function setValue(nextValue: boolean): void {
    value.value = nextValue;
  }

  function toggle(): void {
    setValue(!value.value);
  }

  function setTrue(): void {
    setValue(true);
  }

  function setFalse(): void {
    setValue(false);
  }

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue,
  };
}
