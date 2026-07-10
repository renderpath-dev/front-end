import { defineStore } from "pinia";
import type { SelectionItem } from "./storeTypes";

type SelectionState = {
  availableItems: Array<SelectionItem>;
  selectedIds: Array<string>;
};

export const useSelectionStore = defineStore("selection", {
  state: (): SelectionState => ({
    availableItems: [
      { id: "order-101", label: "Order 101" },
      { id: "order-102", label: "Order 102" },
      { id: "order-103", label: "Order 103" },
    ],
    selectedIds: [],
  }),
  actions: {
    select(id: string): void {
      if (!this.selectedIds.includes(id)) {
        this.selectedIds.push(id);
      }
    },
    unselect(id: string): void {
      this.selectedIds = this.selectedIds.filter(
        (selectedId) => selectedId !== id,
      );
    },
    toggle(id: string): void {
      if (this.selectedIds.includes(id)) {
        this.unselect(id);
      } else {
        this.select(id);
      }
    },
    clear(): void {
      this.selectedIds = [];
    },
    selectMany(ids: ReadonlyArray<string>): void {
      this.selectedIds = [
        ...new Set(
          ids.filter((id) =>
            this.availableItems.some((item) => item.id === id),
          ),
        ),
      ];
    },
  },
});
