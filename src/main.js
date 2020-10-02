import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import Amplify from "aws-amplify";
import {
  applyPolyfills,
  defineCustomElements,
} from "@aws-amplify/ui-components/loader";
import aws_exports from "./aws-exports";
import store from "./store";
import router from "./router";
/**
 * I am doing the polyfilling here locally as amplify-ui is not updated for vue 3
 */
applyPolyfills().then(() => {
  defineCustomElements(window);
});

Amplify.configure(aws_exports);

const app = createApp(App)
  .use(router)
  .use(store);

app.config.isCustomElement = (tag) => /amplify-\w*/.match(tag);

app.mount("#app");
