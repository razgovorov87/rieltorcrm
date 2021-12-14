import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import currencyFilter from "@/filters/currency.filter";
import dateFilter from "@/filters/date.filter";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import { io } from 'socket.io-client';
import vClickOutside from "v-click-outside";
import Vue from "vue";
import VueMyToasts from "vue-my-toasts";
import "vue-my-toasts/dist/vue-my-toasts.css";
import VueSocketIOExt from 'vue-socket.io-extended';
import VueCollapse from "vue2-collapse";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import "./assets/tailwind.css";
import axiosSetUp from "./axios";
import vuetify from './plugins/vuetify';
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
const moment = require('moment')
require('moment/locale/ru')

axiosSetUp();
Vue.use(require('vue-moment'), {
  moment
});
Vue.component("Loading", Loading);
Vue.use(VueMyToasts, {
  component: Alert,
  options: {
    width: "500px",
    position: "bottom-right",
    padding: "1rem",
  },
});

const socket = io(process.env.VUE_APP_WS_URL);
Vue.use(VueSocketIOExt, socket, {store});
Vue.use(vClickOutside);
Vue.use(VueCollapse);

Vue.config.productionTip = false;

Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.use(Vuelidate);


// Vue.use(new VueSocketIO({
//   debug: false,
//   connection: process.env.VUE_APP_WS_URL,
//   vuex: {
//       store,
//       actionPrefix: 'SOCKET_',
//       mutationPrefix: 'SOCKET_'
//   },
// }));


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");