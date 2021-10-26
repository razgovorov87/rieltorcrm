import Vue from "vue";
import Vuex from "vuex";
import agents from "./agents";
import auth from "./auth";
import client from "./client";
import logs from "./logs";
import objects from "./objects";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    client,
    agents,
    logs,
    objects,
  },
});
