<script setup lang="ts">
import { nuxtContentBoundaryItems } from "../models/nuxtContentModel";
</script>

<template>
  <section class="chapter-card">
    <h3>Content boundary</h3>
    <dl>
      <template v-for="item in nuxtContentBoundaryItems" :key="item.area">
        <dt>{{ item.area }}</dt>
        <dd>{{ item.owner }} — {{ item.check }}</dd>
      </template>
    </dl>
  </section>
</template>

<style scoped>
.chapter-card {
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

h3 {
  margin-top: 0;
}

dl {
  display: grid;
  gap: 0.6rem;
}

dt {
  font-weight: 800;
}

dd {
  margin: 0;
  color: #496358;
}
</style>
