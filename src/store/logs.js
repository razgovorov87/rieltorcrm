import axios from "axios";
import firebase from "firebase/app";
const SERVER_URL = process.env.VUE_APP_API_URL;

export default {
  actions: {
    async saveNote({ dispatch }, { text, clientId, agent }) {
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
    },

    async addOfferObjectLog({ dispatch }, { itemId, link, pdfNumber }) {
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
    },

    async saveCategory(
      { dispatch },
      { categories, categoriesColor, msgType, logType, clientId }
    ) {
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
    },
  },
};
