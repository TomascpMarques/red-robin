import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import cors from "cors";
import animate from "animate.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

library.add(faCoffee);

const app = createApp(App).use(store).use(router).use(cors).use(animate);
app.mount("#app");
