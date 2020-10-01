<template>
  <Login />
</template>

<script>
import Login from "./components/Login";
import store from "@/store";
export default {
  name: "App",
  store,
  components: {
    Login,
  },
};
</script>

<style></style>
