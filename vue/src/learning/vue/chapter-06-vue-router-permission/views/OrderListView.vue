<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { routeNames } from "../router/routeNames";

const route = useRoute(routeNames.orders);
const router = useRouter();

const orders = [
  { id: "o-900", status: "pending", total: 129 },
  { id: "o-901", status: "paid", total: 84 },
  { id: "o-902", status: "pending", total: 215 },
] as const;

const statusFilter = computed(() => {
  const status = route.query.status;
  return typeof status === "string" ? status : "all";
});

const page = computed(() => {
  const rawPage = route.query.page;
  const parsedPage =
    typeof rawPage === "string" ? Number(rawPage) : 1;
  return Number.isInteger(parsedPage) && parsedPage > 0
    ? parsedPage
    : 1;
});

const visibleOrders = computed(() =>
  statusFilter.value === "all"
    ? orders
    : orders.filter(
        (order) => order.status === statusFilter.value,
      ),
);

async function setStatus(status: string): Promise<void> {
  await router.replace({
    query: {
      ...route.query,
      status: status === "all" ? undefined : status,
      page: "1",
    },
  });
}
</script>

<template>
  <section class="order-list-view">
    <p class="topic">Query-owned filters</p>
    <h2>Order Management</h2>
    <p>Status: {{ statusFilter }} · Page: {{ page }}</p>
    <div class="actions">
      <button type="button" @click="setStatus('all')">All</button>
      <button type="button" @click="setStatus('pending')">
        Pending
      </button>
      <button type="button" @click="setStatus('paid')">Paid</button>
    </div>
    <ul>
      <li v-for="order in visibleOrders" :key="order.id">
        {{ order.id }} · {{ order.status }} · ${{ order.total }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.order-list-view {
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

.actions {
  display: flex;
  gap: 0.45rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #84a4c5;
  border-radius: 0.45rem;
  background: #f7fbff;
  cursor: pointer;
}

ul {
  margin: 0;
  padding-left: 1.25rem;
}
</style>
