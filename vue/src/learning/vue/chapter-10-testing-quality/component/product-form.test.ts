import { createPinia } from "pinia";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ProductForm from "../../chapter-08-admin-ui-forms/forms/ProductForm.vue";
import { ElementPlus } from "../../chapter-08-admin-ui-forms/ui/elementPlus";
import { createProductFormModel } from "../vitest/testFactories";
import { flushAsync } from "../vitest/flushAsync";

describe("ProductForm", () => {
  it("emits cancel and submits a valid model", async () => {
    const wrapper = mount(ProductForm, {
      props: {
        modelValue: createProductFormModel(),
      },
      global: {
        plugins: [createPinia(), ElementPlus],
      },
    });

    const buttons = wrapper.findAll("button");
    expect(wrapper.find("input").element.value).toBe("Monitor Arm");
    await buttons[0]?.trigger("click");
    wrapper.find("form").element.requestSubmit();
    await flushAsync();

    expect(wrapper.emitted("cancel")).toHaveLength(1);
    expect(wrapper.emitted("submit")).toHaveLength(1);
  });

  it("updates the public form model through user input", async () => {
    const model = createProductFormModel();
    const wrapper = mount(ProductForm, {
      props: {
        modelValue: model,
      },
      global: {
        plugins: [createPinia(), ElementPlus],
      },
    });

    const nameInput = wrapper.find("input");
    await nameInput.setValue("Updated Monitor Arm");
    await nameInput.trigger("change");
    await flushAsync();

    expect(model.name).toBe("Updated Monitor Arm");
    expect(wrapper.emitted("change")?.length).toBeGreaterThan(0);
  });
});
