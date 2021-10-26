import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import currencyFilter from "@/filters/currency.filter";
import dateFilter from "@/filters/date.filter";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import vClickOutside from "v-click-outside";
import Vue from "vue";
import VueMyToasts from "vue-my-toasts";
import "vue-my-toasts/dist/vue-my-toasts.css";
import VueCollapse from "vue2-collapse";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import "./assets/tailwind.css";
import axiosSetUp from "./axios";
import config from "./configFirebase";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

axiosSetUp();

Vue.component("Loading", Loading);
Vue.use(VueMyToasts, {
  component: Alert,
  options: {
    width: "500px",
    position: "bottom-right",
    padding: "1rem",
  },
});

Vue.use(vClickOutside);
Vue.use(VueCollapse);

Vue.config.productionTip = false;

Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.use(Vuelidate);

firebase.initializeApp(config);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
