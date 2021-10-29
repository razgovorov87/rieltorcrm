import axios from "axios";
import firebase from "firebase/app";
import router from "../router";

export default {
  state: {
    refresh_token: "",
    access_token: "",
    hasTokens: false,
    loggedInUser: {},
    isAuthenticated: false,
  },
  mutations: {
    setRefreshToken: function(state, refreshToken) {
      state.refresh_token = refreshToken;
      localStorage.setItem("refresh_token", refreshToken);
    },

    setAccessToken: function(state, accessToken) {
      state.access_token = accessToken;
      localStorage.setItem("access_token", accessToken);
    },

    setLoggedInUser: function(state, user) {
      state.loggedInUser = user;
      state.isAuthenticated = true;
    },

    clearUserData: function(state) {
      state.refresh_token = "";
      state.access_token = "";
      state.loggedInUser = {};
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      state.isAuthenticated = false;
    },
  },
  getters: {
    loggedInUser: (state) => state.loggedInUser,
    isAuthenticated: (state) => state.isAuthenticated,
    accessToken: (state) => state.access_token,
    hasTokens: (state) => state.hasTokens,
    refreshToken: (state) => state.refresh_token,
  },
  actions: {
    async login({ dispatch, commit }, { login, password }) {
      try {
        const data = {
          username: login,
          password: password,
        };
        const response = await axios.post(`/login`, data);
        commit("setRefreshToken", response.data.refresh_token);
        commit("setAccessToken", response.data.access_token);
        await dispatch("fetchInfo");
      } catch (e) {
        throw e;
      }
    },

    hasTokens: function(state) {},

    async fetchInfo({ dispatch, commit }) {
      try {
        const info = await axios.post(`/fetchInfo`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
          },
        });
        commit("setLoggedInUser", info.data);
        return info.data ? info.data : null;
      } catch (e) {
        throw e;
      }
    },

    async register(
      { dispatch, commit },
      { login, password, surname, name, secondName, phone }
    ) {
      try {
        const data = {
          login,
          surname,
          name,
          secondName,
          password,
          phone,
        };
        const response = await axios.post(`/registration`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        throw e;
      }
    },

    async verifyAgent({ dispatch }, id) {
      await firebase
        .database()
        .ref(`/users/${id}`)
        .update({
          verify: true,
        });
    },

    async refreshToken({ state, commit }) {
      try {
        const response = await axios.post(
          "/token/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
            },
          }
        );
        commit("setAccessToken", response.data.access_token);
      } catch (e) {
        throw e;
      }
    },

    getUid({ state, commit }) {
      const user = state.loggedInUser;
      return user ? user.id : null;
    },

    async checkLogin({ dispatch }, login) {
      const data = {
        login,
      };
      const response = await axios.post(`/checkLogin`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.status;
    },

    async logout({ dispatch, commit }) {
      commit('clearUserData');
      router.push('/login');
    },
  },
};
