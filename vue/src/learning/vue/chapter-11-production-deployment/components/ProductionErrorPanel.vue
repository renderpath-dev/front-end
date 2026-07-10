<script setup lang="ts">
import {
  createPreloadErrorMessage,
  preloadErrorPolicy,
} from "../performance/preloadErrorPolicy";

const exampleMessage = createPreloadErrorMessage(
  "/assets/Dashboard.abcd1234.js",
);
</script>

<template>
  <section class="production-card">
    <p class="panel-kicker">Production errors</p>
    <h3>Error handling is a deliberate integration boundary</h3>
    <p>
      Vue app-level error handling can forward runtime errors to a deliberately
      installed service, but this chapter does not fake monitoring integration.
    </p>
    <dl class="definition-grid">
      <div>
        <dt>Preload event</dt>
        <dd>{{ preloadErrorPolicy.eventName }}</dd>
      </div>
      <div>
        <dt>Likely cause</dt>
        <dd>{{ preloadErrorPolicy.likelyCause }}</dd>
      </div>
    </dl>
    <p class="panel-note">{{ exampleMessage }}</p>
  </section>
</template>
