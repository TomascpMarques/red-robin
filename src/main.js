import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import cors from "cors";
import animate from "animate.css";

createApp(App).use(store).use(router).use(cors).use(animate).mount("#app");
