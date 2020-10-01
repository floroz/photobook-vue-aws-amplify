import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import Amplify from "aws-amplify";
import "@aws-amplify/ui-vue";
import aws_exports from "./aws-exports";

Amplify.configure(aws_exports);

const app = createApp(App);

app.config.isCustomElement = (tag) => /amplify-\w*/.match(tag);

app.mount("#app");
