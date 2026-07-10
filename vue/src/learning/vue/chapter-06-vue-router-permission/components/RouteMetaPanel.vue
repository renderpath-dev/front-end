<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import {
  hasPermission,
  hasRole,
} from "../router/authSession";
import PermissionBadge from "./PermissionBadge.vue";

const route = useRoute();

const requiredRoles = computed(
  () => route.meta.requiredRoles ?? [],
);
const requiredPermissions = computed(
  () => route.meta.requiredPermissions ?? [],
);
const breadcrumb = computed(
  () => route.meta.breadcrumb ?? [],
);
const title = computed(
  () => route.meta.title ?? "Untitled route",
);
const layout = computed(
  () => route.meta.layout ?? "public",
);
const showInMenu = computed(
  () => route.meta.showInMenu ?? false,
);
const roleGranted = computed(() =>
  hasRole(requiredRoles.value),
);
const permissionGranted = computed(() =>
  hasPermission(requiredPermissions.value),
);
</script>

<template>
  <article class="meta-panel">
    <p class="topic">Merged route meta</p>
    <h3>{{ title }}</h3>
    <p>
      Layout: {{ layout }} ·
      Menu: {{ showInMenu ? "visible" : "hidden" }}
    </p>
    <p>
      Breadcrumb: {{ breadcrumb.join(" / ") || "None" }}
    </p>
    <div class="badges">
      <PermissionBadge
        label="Role contract"
        :granted="roleGranted"
      />
      <PermissionBadge
        label="Permission contract"
        :granted="permissionGranted"
      />
    </div>
    <p class="boundary">
      These checks control navigation and UI only. Protected backend
      operations still require server authorization.
    </p>
  </article>
</template>

<style scoped>
.meta-panel {
  padding: 1rem;
  border: 1px solid #cdd9e5;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #175cd3;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.75rem;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.boundary {
  color: #7a2e0e;
  font-weight: 700;
}
</style>
