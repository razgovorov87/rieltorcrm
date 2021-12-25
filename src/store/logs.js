import axios from "axios";
const SERVER_URL = process.env.VUE_APP_API_URL;

export default {
  actions: {
    async saveNote({ dispatch }, { text, clientId, agent }) {
      try {
        const data = {
          text,
          clientId,
          agent,
        };
        const response = axios.post(`/saveNote`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        throw e;
      }
    },

    async addOfferObjectLog({ dispatch }, { itemId, link, pdfNumber }) {
      try {
        const uid = await dispatch("getUid");
        const data = {
          pdfNumber,
          link,
          clientId: itemId,
          agent: uid,
        };
        const response = await axios.post(`/addOfferObjectLog`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (e) {
        throw e;
      }
    },

    async saveCategory(
      { dispatch },
      { categories, categoriesColor, msgType, logType, clientId }
    ) {
      try {
        const uid = await dispatch("getUid");
        const data = {
          categories,
          categoriesColor,
          logType,
          msgType,
          agent: uid,
          clientId,
        };

        const response = await axios.post(`/saveCategory`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (e) {
        throw e;
      }
    },
  },
};
