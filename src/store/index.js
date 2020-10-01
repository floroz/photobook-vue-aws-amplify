import { createStore } from "vuex";
import { auth } from "./auth/auth";

const store = createStore({
  modules: {
    auth,
  },
});

export default store;
