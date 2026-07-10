import { createPinia, setActivePinia } from "pinia";
import { mount } from "@vue/test-utils";
import { computed, defineComponent, onMounted, ref } from "vue";
import { createMemoryHistory, createRouter, useRoute } from "vue-router";
import { describe, expect, it } from "vitest";
import { useAuthStore } from "../../chapter-07-pinia-state-management/stores/authStore";
import { normalizeHttpStatus } from "../../chapter-09-api-runtime-boundary/api/apiErrors";
import { productListResponseSchema } from "../../chapter-09-api-runtime-boundary/validators/productValidator";
import { setMswScenario } from "../msw/msw-scenarios";
import { flushAsync } from "../vitest/flushAsync";

const ProductRoute = defineComponent({
  name: "ProductRouteHarness",
  setup() {
    const route = useRoute();
    const authStore = useAuthStore();
    const productNames = ref<ReadonlyArray<string>>([]);
    const requestState = ref("loading");
    const canCreate = computed(() => authStore.role === "admin");

    onMounted(async () => {
      const url = new URL("http://localhost/chapter-10-api/products");
      const keyword = route.query.keyword;
      if (typeof keyword === "string") {
        url.searchParams.set("keyword", keyword);
      }
      const response = await fetch(url);
      if (!response.ok) {
        requestState.value = normalizeHttpStatus(response.status);
        return;
      }
      const body: unknown = await response.json();
      const parsed = productListResponseSchema.safeParse(body);

      if (!parsed.success) {
        requestState.value = "invalid";
        return;
      }

      productNames.value = parsed.data.data.map(
        (product) => product.product_name,
      );
      requestState.value = "success";
    });

    return { canCreate, productNames, requestState };
  },
  template: `
    <section>
      <p>{{ requestState }}</p>
      <button v-if="canCreate">Create product</button>
      <ul>
        <li v-for="name in productNames" :key="name">{{ name }}</li>
      </ul>
    </section>
  `,
});

describe("route, store, and API integration", () => {
  it("uses route query and auth state while rendering MSW data", async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const authStore = useAuthStore();
    authStore.signInAs("admin");
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: "/products", component: ProductRoute }],
    });

    await router.push("/products?keyword=dock");
    await router.isReady();
    const wrapper = mount(
      { template: "<RouterView />" },
      {
        global: {
          plugins: [pinia, router],
        },
      },
    );
    await flushAsync();
    await flushAsync();

    expect(router.currentRoute.value.path).toBe("/products");
    expect(router.currentRoute.value.query.keyword).toBe("dock");
    expect(authStore.role).toBe("admin");
    expect(wrapper.text()).toContain("success");
    expect(wrapper.text()).toContain("USB-C Dock");
    expect(wrapper.text()).not.toContain("Mechanical Keyboard");
    expect(wrapper.get("button").text()).toBe("Create product");
  });

  it("renders a normalized API error and denied permission projection", async () => {
    setMswScenario("server");
    const pinia = createPinia();
    setActivePinia(pinia);
    useAuthStore().signInAs("operator");
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: "/products", component: ProductRoute }],
    });

    await router.push("/products");
    await router.isReady();
    const wrapper = mount(
      { template: "<RouterView />" },
      {
        global: {
          plugins: [pinia, router],
        },
      },
    );
    await flushAsync();
    await flushAsync();

    expect(wrapper.text()).toContain("server");
    expect(wrapper.find("button").exists()).toBe(false);
  });
});
