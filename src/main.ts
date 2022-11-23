import { createApp } from "vue";
import { createPinia } from "pinia";
import vue3GoogleLogin from "vue3-google-login";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(vue3GoogleLogin, {
  clientId:
    "681310618538-s6g1aq6eposlcsh028n5gu8f68k8l56l.apps.googleusercontent.com",
});
app.use(router);

app.mount("#app");
