<script setup lang="ts">
import { basePathRecords } from "../production/basePathModel";
</script>

<template>
  <section class="production-card">
    <p class="panel-kicker">Base path</p>
    <h3>Asset URLs must match the deployed path</h3>
    <p>
      Vite base controls generated asset URLs. Router history base must match
      the same deployment path when clean URLs are used.
    </p>
    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Strategy</th>
            <th>Base</th>
            <th>Failure signal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in basePathRecords" :key="record.strategy">
            <td>{{ record.strategy }}</td>
            <td>{{ record.viteBase }}</td>
            <td>{{ record.failureSignal }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
