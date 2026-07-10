import { computed, shallowRef } from "vue";

export function useLocalCrudCollection<Item extends { id: string }>(
  initialItems: ReadonlyArray<Item>,
  cloneItem: (item: Item) => Item,
) {
  const collection = shallowRef<Array<Item>>(
    initialItems.map((item) => cloneItem(item)),
  );

  const items = computed<ReadonlyArray<Item>>(() => collection.value);

  function create(item: Item): void {
    collection.value = [...collection.value, cloneItem(item)];
  }

  function update(id: string, item: Item): void {
    collection.value = collection.value.map((current) =>
      current.id === id ? cloneItem(item) : current,
    );
  }

  function remove(id: string): void {
    collection.value = collection.value.filter((item) => item.id !== id);
  }

  function replace(nextItems: ReadonlyArray<Item>): void {
    collection.value = nextItems.map((item) => cloneItem(item));
  }

  return {
    items,
    create,
    update,
    delete: remove,
    replace,
  };
}
