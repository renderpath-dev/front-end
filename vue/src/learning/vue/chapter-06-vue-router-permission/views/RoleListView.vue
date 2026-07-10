<script setup lang="ts">
import { currentUser } from "../router/authSession";

const roleRows = [
  {
    role: "admin",
    access: "All router lab pages",
  },
  {
    role: "manager",
    access: "Dashboard, users, and orders",
  },
  {
    role: "operator",
    access: "Dashboard and orders",
  },
] as const;
</script>

<template>
  <section class="role-list-view">
    <p class="topic">Permission route</p>
    <h2>Role Management</h2>
    <p>Current role: {{ currentUser?.role ?? "signed out" }}</p>
    <table>
      <thead>
        <tr>
          <th>Role</th>
          <th>Visible router lab access</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in roleRows" :key="row.role">
          <td>{{ row.role }}</td>
          <td>{{ row.access }}</td>
        </tr>
      </tbody>
    </table>
    <p class="boundary">
      Route visibility is not API authorization. The server must verify the
      caller for every protected operation.
    </p>
  </section>
</template>

<style scoped>
.role-list-view {
  display: grid;
  gap: 0.8rem;
}

.topic {
  margin: 0;
  color: #175cd3;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h2,
p {
  margin: 0;
}

table {
  border-collapse: collapse;
}

th,
td {
  padding: 0.6rem;
  border: 1px solid #cbd5e1;
  text-align: left;
}

.boundary {
  color: #7a2e0e;
  font-weight: 700;
}
</style>
