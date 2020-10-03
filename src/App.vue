<template>
  <div id="app">
    <div id="nav">
      <Navbar />
      <router-view />
    </div>
  </div>
</template>

<script>
import store from "@/store";
import Navbar from "@/components/Nav.vue";
import { mapActions } from "vuex";
export default {
  name: "App",
  store,
  components: {
    Navbar,
  },
  methods: {
    ...mapActions("auth", ["authAction"]),
  },
  mounted() {
    this.authAction();
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
