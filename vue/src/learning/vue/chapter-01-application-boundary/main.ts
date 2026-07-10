import { createApp } from "vue";
import App from "./App.vue";
import { router } from "../chapter-06-vue-router-permission/router";
import { pinia } from "../chapter-07-pinia-state-management/stores/pinia";
import { adminI18n } from "../chapter-08-admin-ui-forms/i18n/adminI18n";
import { ElementPlus } from "../chapter-08-admin-ui-forms/ui/elementPlus";

const app = createApp(App);

app.use(pinia);
app.use(adminI18n);
app.use(ElementPlus);
app.use(router);
app.mount("#app");
