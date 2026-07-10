<script setup lang="ts">
import { envModeRecords, safeDemoEnv } from "../production/envModeModel";
</script>

<template>
  <section class="production-card">
    <p class="panel-kicker">Env modes</p>
    <h3>Only public VITE values enter client code</h3>
    <p>
      Build-time env values are string inputs to the bundle. They must be public
      because client JavaScript can be inspected by the browser.
    </p>
    <dl class="definition-grid">
      <div>
        <dt>Title</dt>
        <dd>{{ safeDemoEnv.title }}</dd>
      </div>
      <div>
        <dt>Base path</dt>
        <dd>{{ safeDemoEnv.publicBasePath }}</dd>
      </div>
      <div>
        <dt>Demo API origin</dt>
        <dd>{{ safeDemoEnv.demoApiOrigin }}</dd>
      </div>
    </dl>
    <ul class="compact-list">
      <li v-for="mode in envModeRecords" :key="mode.mode">
        <strong>{{ mode.command }}</strong>
        <span>{{ mode.purpose }}</span>
      </li>
    </ul>
  </section>
</template>
