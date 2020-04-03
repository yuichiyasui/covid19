import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
Vue.use(axios);


export default new Vuex.Store({
  state: {
    masterData: {}
  },
  mutations: {
    addMasterData(state, masterData) {
      state.masterData = masterData;
    }
  },
  actions: {
    async fetchMasterData(context) {
      await axios
        .get("https://dl.dropboxusercontent.com/s/6mztoeb6xf78g5w/COVID-19.csv")
        .then(response => 
          context.commit("addMasterData", response)
          )
        .catch(e => {
          alert(e);
        });
    }
  },
  modules: {}
});
