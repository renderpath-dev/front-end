<script setup lang="ts">
import { computed } from "vue";
import type { NormalizedApiError } from "../api/apiErrors";
import { useApiErrorPresenter } from "../composables/useApiErrorPresenter";

const props = defineProps<{
  error: NormalizedApiError | null;
}>();

const { present } = useApiErrorPresenter();
const presentation = computed(() =>
  props.error ? present(props.error) : null,
);
</script>

<template>
  <ElAlert
    v-if="presentation"
    :title="presentation.title"
    :description="`${presentation.description} ${presentation.suggestedAction}`"
    :type="presentation.severity"
    :closable="false"
    show-icon
  />
</template>
