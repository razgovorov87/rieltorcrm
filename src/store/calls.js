import axios from "axios";
const SERVER_URL = process.env.VUE_APP_API_URL;

export default {
  actions: {
    async getCalls({ dispatch }) {
          const response = await axios.get(`/fetchCalls`);
          return response.data;
    },
  },
};
