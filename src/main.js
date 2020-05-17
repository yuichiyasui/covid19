import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import firebase from "firebase/app";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA7KbFnxauz14nmGUr6hBFZigZWyCrmc7I",
  authDomain: "covid19-307d1.firebaseapp.com",
  databaseURL: "https://covid19-307d1.firebaseio.com",
  projectId: "covid19-307d1",
  storageBucket: "covid19-307d1.appspot.com",
  messagingSenderId: "390992757491",
  appId: "1:390992757491:web:8e127a92d4307948f82d86",
  measurementId: "G-VJY9ZQH6NQ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  axios,
  render: (h) => h(App),
}).$mount("#app");
