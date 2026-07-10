import { createPinia } from "pinia";
import { piniaPersistencePlugin } from "./piniaPersistencePlugin";

export const pinia = createPinia();

pinia.use(piniaPersistencePlugin);
