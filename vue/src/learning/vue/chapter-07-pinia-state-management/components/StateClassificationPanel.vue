<script setup lang="ts">
const stateExamples = [
  ["Modal open state", "Component local state", "ref() in the owner"],
  ["Product form draft", "Form state", "Form component or form composable"],
  ["Signed-in user", "Global client state", "Pinia auth store"],
  ["Theme and density", "Global client state", "Pinia UI stores"],
  ["Page and filters", "URL state", "Router query and params"],
  ["Remote products", "Server state", "Future API cache policy"],
  ["Protected write", "Authorization", "Backend"],
] as const;
</script>

<template>
  <section class="panel">
    <h2>State classification map</h2>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Example</th>
            <th>Classification</th>
            <th>Correct owner</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in stateExamples" :key="row[0]">
            <td>{{ row[0] }}</td>
            <td>{{ row[1] }}</td>
            <td>{{ row[2] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.panel {
  padding: 1.25rem;
  border: 1px solid #cbd5e1;
  border-radius: 1rem;
  background: #ffffff;
}

h2 {
  margin-top: 0;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.7rem;
  border-bottom: 1px solid #e2e8f0;
  text-align: left;
}

th {
  color: #0f766e;
}
</style>
