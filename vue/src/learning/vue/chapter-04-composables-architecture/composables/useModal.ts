import { type Ref } from "vue";
import { useToggle } from "./useToggle";

export type ModalState = {
  isOpen: Ref<boolean>;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export function useModal(initiallyOpen = false): ModalState {
  const {
    value: isOpen,
    toggle,
    setTrue: open,
    setFalse: close,
  } = useToggle(initiallyOpen);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
