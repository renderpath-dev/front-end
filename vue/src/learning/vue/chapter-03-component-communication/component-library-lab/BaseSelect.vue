<script setup lang="ts">
type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  options: SelectOption[];
  id?: string;
  disabled?: boolean;
};

withDefaults(defineProps<Props>(), {
  id: undefined,
  disabled: false,
});

const selectedValue = defineModel<string>({ required: true });

function updateValue(event: Event): void {
  const select = event.currentTarget;

  if (select instanceof HTMLSelectElement) {
    selectedValue.value = select.value;
  }
}
</script>

<template>
  <select
    :id="id"
    :value="selectedValue"
    :disabled="disabled"
    @change="updateValue"
  >
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped>
select {
  width: 100%;
  padding: 0.55rem 0.65rem;
  border: 1px solid #9aa9bf;
  border-radius: 0.45rem;
  background: #ffffff;
  color: #243754;
  font: inherit;
}
</style>
