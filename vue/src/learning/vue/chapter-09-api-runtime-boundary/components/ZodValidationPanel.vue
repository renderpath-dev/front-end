<script setup lang="ts">
import { computed, ref } from "vue";
import { productDtoSchema } from "../validators/productValidator";
import { formatZodError } from "../validators/zodErrorFormatter";

const useValidValue = ref(true);

const candidate = computed<unknown>(() =>
  useValidValue.value
    ? {
        id: "product-900",
        product_name: "Validated Product",
        category: "Course",
        unit_price: 80,
        stock_count: 10,
        status: "active",
      }
    : {
        id: 900,
        product_name: "",
        unit_price: "80",
      },
);

const result = computed(() =>
  productDtoSchema.safeParse(candidate.value),
);

const issues = computed(() =>
  result.value.success
    ? []
    : formatZodError(result.value.error),
);
</script>

<template>
  <ElCard header="Zod runtime validation" shadow="never">
    <ElSwitch
      v-model="useValidValue"
      active-text="Valid value"
      inactive-text="Invalid value"
    />
    <ElAlert
      class="result"
      :title="result.success ? 'safeParse success' : 'safeParse failure'"
      :type="result.success ? 'success' : 'error'"
      :closable="false"
    />
    <ul>
      <li v-for="issue in issues" :key="issue">{{ issue }}</li>
    </ul>
  </ElCard>
</template>

<style scoped>
.result {
  margin-top: 0.75rem;
}
</style>
