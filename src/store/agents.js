import axios from "axios";

const SERVER_URL = process.env.VUE_APP_API_URL;

export default {
  state: {
    agents: {},
  },
  mutations: {
    setAgents(state, agents) {
      state.agents = agents;
    },

    clearClients(state) {
      state.agents = {};
    },
  },
  actions: {
    async fetchAgents({ dispatch, commit }) {
      const info = await axios.get(`/fetchAgents`);
      const arr = Object.keys(info.data).map((key) => ({
        ...info.data[key],
        id: key,
      }));
      commit("setAgents", arr);
      return arr;
    },

    async switchAgent({ dispatch }, { clientId, newAgent }) {
      const uid = await dispatch("getUid");
      const data = {
        clientId,
        managerId: uid,
        newAgent,
      };
      await axios.post(`/switchAgent`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    async deleteUser({ dispatch }, agent) {
      const response = await axios({
        method: "post",
        url: `/deleteUser`,
        data: {
          agentId: agent.id,
        },
      });
    },
  },

  getters: {
    agents: (s) => s.agents,
  },
};
