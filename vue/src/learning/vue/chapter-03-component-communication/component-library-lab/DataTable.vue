<script setup lang="ts">
type TableColumn = {
  key: string;
  label: string;
};

type TableRow = {
  id: string;
  [key: string]: string | number | boolean;
};

type Props = {
  columns: TableColumn[];
  rows: TableRow[];
};

defineProps<Props>();

defineSlots<{
  cell(props: {
    row: TableRow;
    column: TableColumn;
    value: string | number | boolean;
  }): unknown;
}>();
</script>

<template>
  <div class="table-scroll">
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key" scope="col">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td v-for="column in columns" :key="column.key">
            <slot
              name="cell"
              :row="row"
              :column="column"
              :value="row[column.key]"
            >
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-scroll {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.65rem;
  border-bottom: 1px solid #dce2ec;
  text-align: left;
}

th {
  color: #3b4f72;
  font-size: 0.8rem;
  text-transform: uppercase;
}
</style>
