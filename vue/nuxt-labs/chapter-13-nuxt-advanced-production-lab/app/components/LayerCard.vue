<script setup lang="ts">
const theme = useLayerTheme();
</script>

<template>
  <BaseCard>
    <p class="eyebrow">Layer primitive</p>
    <h2>Local layer is active</h2>
    <p>Accent color: {{ theme.accentColor }}</p>
    <LayerButton>Rendered through layer component ownership</LayerButton>
  </BaseCard>
</template>

<style scoped>
.eyebrow {
  margin: 0;
  color: #18794e;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
</style>
