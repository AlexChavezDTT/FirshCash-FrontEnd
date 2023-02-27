import { createStore } from 'vuex'
import jsonData from '../views/data.json'
import axios from 'axios';

export default createStore({
  state: {
    user: undefined,
    password: undefined,
    rol: undefined,
    showList: true,
    showEditExpenseReport: false,
    showNewExpenseReport: false,
    infoList: [],
    infoEmployees: [],
    objListReports: [],
  },
  getters: {
  },
  mutations: {
    setListReport(state, payload) {
      state.objListReports = payload;
      console.log("payload reports", state.objListReports);
    },
    setUser(state, payload) {
      console.log("payload", payload);
      state.user = payload;
      console.log("payload", state.user);
    },
    setPassword(state, payload) {
      state.password = payload;
    },
    setRol(state, payload) {
      state.rol = payload;
    },
    setShowList(state, payload) {
      state.showList = !state.showList;
      state.showNewExpenseReport = false;
      state.showEditExpenseReport = false;
    },
    setShowEditExpenseReport(state, payload) {
      state.showList = false;
      state.showNewExpenseReport = false;
      state.showEditExpenseReport = true;
      state.infoList = payload;
    },
    setEmployeesList(state, payload) {
      state.infoEmployees = payload;
    },
    setShowNewExpenseReport(state, payload) {
      state.showList = false;
      state.showNewExpenseReport = true;
      state.showEditExpenseReport = false;
    }
  },
  actions: {
    async login({ commit }, params) {
      let objUser = undefined;
      let objApiForm = {
        email: params.formData.value.email,
        custentity_fc_password_integration: params.formData.value.password
      }
      await axios.post('http://127.0.0.1:3000/api/mongo/login', objApiForm)
        .then(function (response) {
          console.log("login", response.data.Employee);
          objUser = response.data.Employee;
          console.log("objUser", objUser);
          commit("setUser", objUser);
        })
        .catch(function (error) {
          console.log(error);
        });

      /* for (let i in jsonData) {
        console.log("email json", jsonData[i].email);
        console.log("email formdata", params.formData.value.email);
        if (jsonData[i].email === params.formData.value.email && jsonData[i].password === params.formData.value.password) {
          console.log(jsonData[i].rol);
          objUser = jsonData[i];
        }
      }
      const data = params.formData;
      console.log(objUser);
      commit("setUser", objUser); */
    }
  },
  modules: {
  }
})
