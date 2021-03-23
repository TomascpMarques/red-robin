import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import cors from "cors";

createApp(App).use(store).use(router).use(cors).mount("#app");
