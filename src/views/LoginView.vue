<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12 col-md-5 col-lg-5 col-xl-5 col-xxl-5 d-none d-sm-block backgroundImage"></div>
      <div class="col-sm-12 col-md-7 col-lg-7 col-xl-7 col-xxl-7 formLogin" v-if="loader">
        <span class="loader"></span>
      </div>
      <div class="col-sm-12 col-md-7 col-lg-7 col-xl-7 col-xxl-7 formLogin" v-if="!loader">
        <center>
          <div class="row">
            <img src="../assets/firshcash_logo.jpeg" class="rounded mx-auto d-block" alt="..." style="width: 400px;" />
          </div>
          <div class="row">
            <form @submit.prevent="handleClickLogin">
              <div class="alert alert-danger" role="alert" v-if="user === null">
                Correo o contraseña incorrecta
              </div>
              <div class="mb-3 mt-3 inputControl">
                <label for="txtEmail" class="form-label">Usuario</label>
                <input type="email" class="form-control form-control-lg" :class="{ 'is-invalid': user === null }"
                  placeholder="name@example.com" v-model="formData.email" />
              </div>
              <div class="mb-3 inputControl">
                <label for="txtPassword" class="form-label">Contraseña</label>
                <input type="password" class="form-control form-control-lg" :class="{ 'is-invalid': user === null }"
                  v-model="formData.password" />
              </div>
              <div class="mt-5 inputControl">
                <div class="d-grid gap-2 col-12 mx-auto">
                  <button class="btn btn-secondary btn-lg" style="border-radius: 20px;" type="submit"
                    :class="{ disabled: buttonLoading }">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                      v-if="buttonLoading"></span>
                    {{ buttonText }}
                  </button>
                </div>
                <div class="d-grid gap-2 col-12 mx-auto mt-2">
                  <button class="btn btn-link btn-lg" style="border-radius: 20px; color: #041688;" type="submit"
                    @click="syncUsers">
                    Sincronizar usuarios con NS
                  </button>
                </div>
              </div>
            </form>
          </div>
        </center>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { onMounted, computed } from "@vue/runtime-core";
import axios from 'axios';

import datajson from "./data.json";

export default {
  name: "LoginView",
  components: {},
  setup() {
    const urlApi = process.env.VUE_APP_URL_API_LOCAL;
    const store = useStore();
    let loader = ref(false);
    let formData = ref({});
    let email = ref("");
    let buttonText = ref("Iniciar Sesión")
    let buttonLoading = ref(false);
    const user = ref(computed(() => store.state.user));

    onMounted(() => {
      /* console.log("cargando");
      syncUsers(); */
    });

    const syncUsers = async () => {
      loader.value = true;
      await axios.post(`${urlApi}/api/mongo/employees/new`, {})
        .then(function (response) {
          loader.value = false;
          showAlert();
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
          loader.value = false;
        });
    }

    const handleClickLogin = async () => {
      buttonLoading.value = true;
      buttonText.value = " Cargando...";

      let objUser = undefined;
      let objApiForm = {
        email: formData.value.email,
        custentity_fc_password_integration: formData.value.password
      }
      await axios.post(`${urlApi}/api/mongo/login`, objApiForm)
        .then(function (response) {
          console.log("login", response.data.Employee);
          objUser = response.data.Employee;
          console.log("objUser", objUser);
          store.commit("setUser", objUser);
        })
        .catch(function (error) {
          console.log(error);
        });

      buttonLoading.value = false;
      buttonText.value = " Iniciar Sesión"

      /* store.dispatch("login", { formData }); */
    }

    return {
      handleClickLogin,
      syncUsers,
      formData,
      email,
      loader,
      buttonText,
      buttonLoading,
      user,
    }
  },
};
</script>
<style lang="scss" scoped>
.formLogin {
  background: rgb(255, 255, 255);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.backgroundImage {
  background-image: url('../assets/image-login-2.jpg');
  background-size: cover;
  height: 100vh;
  min-height: 100vh;
}

.inputControl {
  width: 98%;
}

@keyframes ldio-zlel7c69rj {
  0% {
    background: #bec5fc
  }

  12.5% {
    background: #bec5fc
  }

  12.625% {
    background: #071689
  }

  100% {
    background: #071689
  }
}

.ldio-zlel7c69rj div {
  position: absolute;
  width: 60.14px;
  height: 60.14px;
  background: #071689;
  animation: ldio-zlel7c69rj 1.25s linear infinite;
}

.loadingio-spinner-blocks-kdgmdr4q63o {
  width: 194px;
  height: 194px;
  display: inline-block;
  overflow: hidden;
  background: rgba(255, 255, 255, 0);
}

.ldio-zlel7c69rj {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
  /* see note above */
}

.ldio-zlel7c69rj div {
  box-sizing: content-box;
}

.loader {
  position: relative;
  font-size: 38px;
  letter-spacing: 2px;
}

.loader:before {
  content: "Sincronizando Usuarios";
  color: #071689;
}

.loader:after {
  content: "";
  width: 30px;
  height: 30px;
  background-color: #075e89;
  border-radius: 50%;
  position: absolute;
  inset: 0;
  margin: auto;
  top: -70px;
  animation: motion 3s ease-in-out infinite;
}

@keyframes motion {

  0%,
  50%,
  100% {
    transform: translateX(0) scale(1);
  }

  25% {
    transform: translateX(-100px) scale(0.3);
  }

  75% {
    transform: translateX(100px) scale(0.3);
  }
}
</style>
