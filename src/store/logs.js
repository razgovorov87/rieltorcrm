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

    async reserveObjLog({ dispatch }, { data, clientId }) {
      const date = new Date();
      const dateId = date.toISOString().slice(0, -14);
      const hours =
        date.getUTCHours() < 10 ? "0" + date.getUTCHours() : date.getUTCHours();
      const minutes =
        date.getUTCMinutes() < 10
          ? "0" + date.getUTCMinutes()
          : date.getUTCMinutes();
      const seconds =
        date.getUTCSeconds() < 10
          ? "0" + date.getUTCSeconds()
          : date.getUTCSeconds();
      const time = hours + ":" + minutes;
      const logId = hours.toString() + minutes.toString() + seconds.toString();
      const uid = await dispatch("getUid");

      let log = {
        logType: "reserveObj",
        agent: uid,
        time,
        obj: data,
      };

      await firebase
        .database()
        .ref(`/clients/${clientId}/logs/${dateId}/${logId}`)
        .update(log);
      log = {
        logType: "reserveObj",
        agent: uid,
        time,
        obj: data,
        dateId,
        logId,
      };
      return log;
    },
  },
};
