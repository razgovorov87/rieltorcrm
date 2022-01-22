import axios from "axios";

export default {
  state: {
    clients: {},
    freeClients: 0,
  },
  mutations: {
    setClients(state, clients) {
      state.clients = clients;
    },

    setFreeClients(state, length) {
      state.freeClients = length;
    },

    removeClient(state, clientId) {
      const idx = state.clients.findIndex((client) => client.id == clientId);
      state.clients.splice(idx, 1);
    },

    pushClients(state, client) {
      state.clients.push(client);
    },

    clearClients(state) {
      state.clients = {};
    },
  },
  actions: {
    async fetchFreeClients({ dispatch, commit }) {
      try {
        const response = await axios.get(`/fetchFreeClients`);
        commit("setFreeClients", response.data);
      } catch (e) {
        throw e;
      }
    },

    async addNewClient(
      { dispatch, commit },
      { phone, fio, comment, missedCall, interestingObj }
    ) {
      try {
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
      } catch (e) {
        throw e;
      }
    },

    async saveClientComposition(
      { dispatch },
      [clientId, composition]
    ) {
      try {
        const data = {
          clientId,
          data: composition,
        };
        const response = await axios.post(`/saveClientComposition`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        throw e;
      }
    },

    async saveCriterion({ dispatch }, { criterion, clientId }) {
      try {
        const data = {
          clientId,
          data: criterion,
        };
        const response = await axios.post(`/saveCriterion`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        throw e;
      }
    },

    async fetchClients({ dispatch, commit }) {
      try {
        const response = await axios.get(`/fetchClients`);
        if (!response.data) return false;
        const result = Object.keys(response.data).map((key) => ({
          ...response.data[key],
          id: key,
        }));
        return result;
      } catch (e) {
        throw e;
      }
    },

    async fetchUserClients({ dispatch, commit }) {
      try {
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
        commit("setClients", result);
        return result;
      } catch (e) {
        throw e;
      }
    },

    async saveClientInfo({commit, dispatch}, { fio, budget, status, clientId }) {
      try {
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
        dispatch('fetchUserClients');
        return response.data;
      } catch (e) {
        throw e;
      }
    },

    async saveClientLinks({ dispatch }, { clientId, arr }) {
      try {
        const data = {
          clientId,
          arr,
        };
        const response = await axios.post(`/saveExceptions`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        throw e;
      }
    },

    async saveExceptions({ dispatch }, { clientId, exceptions }) {
      try {
        const data = {
          clientId,
          exceptions,
        };
        const response = await axios.post(`/saveExceptions`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        throw e;
      }
    },

    async catchNewClient({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const data = {
          agentId: uid,
        };
        const item = await axios.post(`/catchNewClient`, data);
        commit("pushClients", item.data);
      } catch (e) {
        throw e;
      }
    },

    async refuseClient(
      { commit, dispatch },
      { cause, otherCause, comment, clientId }
    ) {
      try {
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
        commit("removeClient", clientId);
      } catch (e) {
        throw e;
      }
    },

    async removeNewClients({ dispatch }, clients) {
      try {
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
      } catch (e) {
        throw e;
      }
    },

    async returnClientToStart({ dispatch }, client) {
      try {
        const data = {
          clientId: client.id,
        };
        const response = axios.post(`/returnClientToStart`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        throw e;
      }
    },

    async returnArchiveClientToStart({ dispatch }, client) {
      try {
        const data = {
          clientId: client.id,
        };
        const response = await axios.post(`/returnArchiveClientToStart`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        throw e;
      }
    },

    async deleteClient({ dispatch }, client) {
      try {
        const data = {
          clientId: client.id,
        };
        const response = await axios.post(`/deleteClient`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        throw e;
      }
    },

    async fetchArchiveClients({ dispatch }) {
      try {
        const response = await axios.get(`/fetchArchiveClients`);
        const result = Object.keys(response.data).map((key) => ({
          ...response.data[key],
          id: key,
        }));
        return result;
      } catch (e) {
        throw e;
      }
    },
  },

  getters: {
    clients: (s) => s.clients,
    freeClients: (s) => s.freeClients,
  },
};
