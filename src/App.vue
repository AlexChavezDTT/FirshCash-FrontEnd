<template>
  <template v-if="user != undefined">
    <HomeView />
  </template>
  <LoginView v-if="!user && user === undefined || !user && user === null" />
</template>

<script>
import { ref } from "vue";
import { onMounted, computed } from "@vue/runtime-core";
import { useStore } from "vuex";

//components
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";

export default {
  name: "App",
  components: {
    LoginView,
    HomeView
  },
  setup() {
    const store = useStore();
    const user = ref(computed(() => store.state.user));
    const objUser = ref(computed(() => store.state.objUser));
    console.log("user", user);

    onMounted(() => {
      console.log("cargando", user.value);
    });

    return {
      user,
      objUser
    };
  },
};
</script>

<style lang="scss">
nav {
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
