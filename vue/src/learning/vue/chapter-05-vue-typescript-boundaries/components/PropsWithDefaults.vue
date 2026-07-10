<script setup lang="ts">
type DisplaySettings = {
  dense: boolean;
  showStatus: boolean;
};

type Props = {
  title?: string;
  labels?: Array<string>;
  settings?: DisplaySettings;
};

withDefaults(defineProps<Props>(), {
  title: "Default type boundary title",
  labels: () => ["props", "defaults"],
  settings: () => ({
    dense: false,
    showStatus: true,
  }),
});
</script>

<template>
  <article class="demo-card" :class="{ dense: settings.dense }">
    <p class="topic">withDefaults</p>
    <h3>{{ title }}</h3>
    <p v-if="settings.showStatus">Defaults resolved for this instance.</p>
    <ul>
      <li v-for="label in labels" :key="label">{{ label }}</li>
    </ul>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.1rem;
  border: 1px solid #d9d1bd;
  border-radius: 0.8rem;
  background: #ffffff;
}

.demo-card.dense {
  padding: 0.65rem;
}

.topic {
  margin: 0;
  color: #86621e;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.65rem;
}

ul {
  padding-left: 1.2rem;
}
</style>
