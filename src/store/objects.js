import axios from "axios";
const SERVER_URL = process.env.VUE_APP_API_URL;

export default {
  actions: {
    async fetchObjects({ dispatch }) {
      try {
        const response = await axios.get(`/fetchObjects`);
        if (!response) return false;
        const result = Object.keys(response.data).map((key) => ({
          ...response.data[key],
          id: key,
        }));
        return result;
      } catch (e) {
        throw e;
      }
    },

    async reserveObj({ dispatch }, { data, clientId }) {
      try {
        const author = await dispatch("getUid");
        const request = {
          data,
          clientId,
          author,
        };
        console.log(request);
        await axios.post(`/reserveObj`, request, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        throw e;
      }
    },

    async fetchClientReserves({ dispatch }, clientId) {
      try {
        const data = {
          clientId,
        };
        const response = await axios.post(`/fetchClientReserves`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response) return false;
        const result = Object.keys(response.data.message).map((key) => ({
          ...response.data.message[key],
          id: key,
        }));
        return result;
      } catch (e) {
        throw e;
      }
    },

    async fetchClientObjects({ dispatch }, clientId) {
      try {
        const data = {
          clientId,
        };
        const response = await axios.post(`/fetchClientObjects`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response) return false;
        const result = Object.keys(response.data).map((key) => ({
          ...response.data[key],
          id: key,
        }));
        return result;
      } catch (e) {
        throw e;
      }
    },

    async fetchReserves({ dispatch }) {
      try {
        const response = await axios.get(`/fetchReserves`);
        if (!response) return false;
        const result = Object.keys(response.data).map((key) => ({
          ...response.data[key],
          id: key,
        }));
        return result;
      } catch (e) {
        throw e;
      }
    },

    async pushResult({ dispatch }, { reverse, result }) {
      try {
        const data = {
          reverseId: reverse.id,
        };
        await axios.post(`/pushResult`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        throw e;
      }
    },

    async addNewObject({ dispatch, commit }, object) {
      try {
        const uid = await dispatch("getUid");
        const data = {
          ...object,
          authorId: uid,
        };
        await axios.post(`/addNewObject`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        throw e;
      }
    },

    async saveInterestingObj({ dispatch }, { client, obj }) {
      try {
        const data = {
          ...obj,
          clientId: client.id,
        };
        await axios.post(`/saveInterestingObj`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        throw e;
      }
    },

    async deleteObj({ dispatch }, obj) {
      try {
        const data = {
          objectId: obj.id,
        };
        await axios.post(`/deleteObj`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        throw e;
      }
    },
  },
};
