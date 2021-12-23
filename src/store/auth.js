import axios from "axios";
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
      localStorage.removeItem("refresh_token");
      localStorage.setItem("refresh_token", refreshToken);
    },

    setAccessToken: function(state, accessToken) {
      state.access_token = accessToken;
      localStorage.removeItem("access_token");
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
        const info = await axios.post(`/fetchInfo`);
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

    async changePassword(
      { dispatch, commit },
      { login, password, restoreCode }
    ) {
      try {
        const data = {
          login,
          password,
          restoreCode,
        };
        const response = await axios.post(`/changePassword`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        throw e;
      }
    },

    async verifyAgent({ dispatch }, id) {
      const data = {
        userId: id,
      }
      await axios.post('/verifyAgent', data);
    },

    async restorePassword({ dispatch }, login) {
      const data = {
        login,
      };
      await axios.post('/restore', data);
    },

    async verifyCode({ dispatch }, {login, restoreCode}) {
      const data = {
        login,
        restoreCode,
      };
      try {
        const response = await axios.post('/verifyRestore', data);
        return response.data['message'];
      } catch (e) {
        throw e;
      }
    },

    async refreshToken({ dispatch, commit }) {
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
