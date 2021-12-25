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
      try {
        const info = await axios.get(`/fetchAgents`);
        const arr = Object.keys(info.data).map((key) => ({
          ...info.data[key],
          id: key,
        }));
        commit("setAgents", arr);
        return arr;
      } catch (e) {
        throw e;
      }
    },

    async switchAgent({ dispatch }, { clientId, newAgent }) {
      try {
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
      } catch (e) {
        throw e;
      }
    },

    async deleteUser({ dispatch }, agent) {
      try {
        const response = await axios({
          method: "post",
          url: `/deleteUser`,
          data: {
            agentId: agent.id,
          },
        });
      } catch (e) {
        throw e;
      }
    },
  },

  getters: {
    agents: (s) => s.agents,
  },
};
