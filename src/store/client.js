import axios from "axios";

const SERVER_URL = process.env.VUE_APP_API_URL;

export default {
  state: {
    clients: {},
  },
  mutations: {
    setClients(state, clients) {
      state.clients = clients;
    },

    pushClients(state, client) {
      state.clients.push(client);
    },

    clearClients(state) {
      state.clients = {};
    },
  },
  actions: {
    async addNewClient(
      { dispatch, commit },
      { phone, fio, comment, missedCall, interestingObj }
    ) {
      const uid = await dispatch("getUid");
      const data = {
        phone,
        fio,
        comment,
        interestingObj,
        missedCall,
        author: uid,
      };

      const response = await axios.post(`/addNewClient`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    async saveClientComposition(
      { dispatch },
      [clientId, frontData, compositionType]
    ) {
      const data = {
        clientId,
        data: frontData,
        compositionType,
      };
      const response = await axios.post(`/saveClientComposition`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    async saveCriterion({ dispatch }, { frontData, clientId }) {
      const data = {
        clientId,
        data: frontData,
      };
      console.log(data);
      const response = await axios.post(`/saveCriterion`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    async fetchClients({ dispatch, commit }) {
      const response = await axios.get(`/fetchClients`);
      if (!response.data) return false;
      const result = Object.keys(response.data).map((key) => ({
        ...response.data[key],
        id: key,
      }));
      commit("setClients", result);
      return result;
    },

    async fetchUserClients({ dispatch, commit }) {
      const uid = await dispatch("getUid");
      const data = {
        agentId: uid,
      };
      const response = await axios.get(`/fetchUserClients`, {
        params: {
          agentId: uid,
        },
      });

      const result = Object.keys(response.data).map((key) => ({
        ...response.data[key],
        id: key,
      }));
      return result;
    },

    async saveClientInfo({}, { fio, budget, status, clientId }) {
      const data = {
        fio,
        budget,
        status,
        clientId,
      };
      const response = await axios.post(`/saveClientInfo`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },

    async saveClientLinks({ dispatch }, { clientId, arr }) {
      const data = {
        clientId,
        arr,
      };
      const response = await axios.post(`/saveExceptions`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    async saveExceptions({ dispatch }, { clientId, exceptions }) {
      const data = {
        clientId,
        exceptions,
      };
      const response = await axios.post(`/saveExceptions`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    async catchNewClient({ dispatch, commit }) {
      const uid = await dispatch("getUid");
      const data = {
        agentId: uid,
      };
      const item = await axios.post(`/catchNewClient`, data);
      return item.data;
    },

    async refuseClient({ dispatch }, { cause, otherCause, comment, clientId }) {
      const uid = await dispatch("getUid");
      const data = {
        agentId: uid,
        cause,
        otherCause,
        comment,
        clientId,
      };
      const response = await axios.post(`/refuseClient`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    async removeNewClients({ dispatch }, clients) {
      const ids = [];
      clients.forEach((client) => ids.push(client.id));
      const data = {
        clients: ids,
      };
      const respose = await axios.post(`/removeNewClients`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    async returnClientToStart({ dispatch }, client) {
      const data = {
        clientId: client.id,
      };
      const response = axios.post(`/returnClientToStart`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    async returnArchiveClientToStart({ dispatch }, client) {
      const data = {
        clientId: client.id,
      };
      const response = await axios.post(`/returnArchiveClientToStart`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    async deleteClient({ dispatch }, client) {
      const data = {
        clientId: client.id,
      };
      const response = await axios.post(`/deleteClient`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    async fetchArchiveClients({ dispatch }) {
      const response = await axios.get(`/fetchArchiveClients`);
      const result = Object.keys(response.data).map((key) => ({
        ...response.data[key],
        id: key,
      }));
      return result;
    },
  },

  getters: {
    clients: (s) => s.clients,
  },
};
