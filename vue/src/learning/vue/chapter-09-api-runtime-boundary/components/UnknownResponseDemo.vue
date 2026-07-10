<script setup lang="ts">
import { computed, ref } from "vue";
import { productDtoSchema } from "../validators/productValidator";
import { formatZodError } from "../validators/zodErrorFormatter";

const rawResponse = ref<unknown>({
  id: 42,
  product_name: null,
  unit_price: "free",
});

const validation = computed(() =>
  productDtoSchema.safeParse(rawResponse.value),
);

const issues = computed(() =>
  validation.value.success
    ? []
    : formatZodError(validation.value.error),
);
</script>

<template>
  <ElCard header="Unknown response boundary" shadow="never">
    <p>
      A TypeScript assertion would only silence checking. Zod inspects the
      runtime object before domain code can use it.
    </p>
    <ElAlert
      :title="validation.success ? 'Validation passed' : 'Validation failed'"
      :type="validation.success ? 'success' : 'error'"
      :closable="false"
      show-icon
    />
    <pre>{{ JSON.stringify(rawResponse, null, 2) }}</pre>
    <ul>
      <li v-for="issue in issues" :key="issue">{{ issue }}</li>
    </ul>
  </ElCard>
</template>

<style scoped>
p {
  line-height: 1.6;
}

pre {
  overflow: auto;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: #111827;
  color: #e5e7eb;
}
</style>
