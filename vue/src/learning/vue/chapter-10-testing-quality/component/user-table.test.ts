import { createPinia } from "pinia";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import DataTablePage from "../../chapter-08-admin-ui-forms/tables/DataTablePage.vue";
import { ElementPlus } from "../../chapter-08-admin-ui-forms/ui/elementPlus";

describe("DataTablePage", () => {
  it("renders its title and toolbar slot while preserving row props", () => {
    const rows = [{ id: "user-1", name: "Avery Admin" }];
    const wrapper = mount(DataTablePage, {
      props: {
        title: "Users",
        rows,
        columns: [{ key: "name", label: "Name" }],
        total: 1,
        page: 1,
        pageSize: 5,
      },
      slots: {
        toolbar: "<button>Add user</button>",
        operations: "<button>Edit user</button>",
      },
      global: {
        plugins: [createPinia(), ElementPlus],
      },
    });

    expect(wrapper.text()).toContain("Users");
    expect(wrapper.text()).toContain("Add user");
    expect(wrapper.props("rows")).toEqual(rows);
  });

  it("forwards pagination updates through its public emits", () => {
    const wrapper = mount(DataTablePage, {
      props: {
        title: "Users",
        rows: [{ id: "user-1", name: "Avery Admin" }],
        columns: [{ key: "name", label: "Name" }],
        total: 10,
        page: 1,
        pageSize: 5,
      },
      global: {
        plugins: [createPinia(), ElementPlus],
      },
    });

    wrapper
      .findComponent({ name: "ElPagination" })
      .vm.$emit("update:current-page", 2);

    expect(wrapper.emitted("pageChange")?.[0]).toEqual([2]);
  });
});
