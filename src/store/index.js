import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import PREF_ARRAY from "../assets/js/prefecture";
import AGE_ARRAY from "../assets/js/age";
import GENDER_ARRAY from "../assets/js/gender";

Vue.use(Vuex);
Vue.use(axios);

export default new Vuex.Store({
  state: {
    masterData: []
  },
  mutations: {
    addMasterData(state, masterData) {
      var bigArray = []; // 1行ずつを格納する配列
      bigArray = masterData.data.split("\r\n"); // 1行ごとに分割して配列に格納
      bigArray.splice(0, 1); // 項目名の行を削除
      var masterDataArray = []; // 必要なデータだけを格納する配列
      for (var i = 0; i < bigArray.length; i++) {
        var miniArray = bigArray[i].split(","); // 1行の各項目を配列に格納
        var arr = miniArray[39].split("/");   // yyyy/MM/ddを'/'で分割
        var date = new Date(arr[0], arr[1] - 1, arr[2]); // yyyy,MM,ddでDateオブジェクトを生成
        var rowData = {
          // 必要な行だけ切り取って連想配列にする
          age: miniArray[5], // 年代
          gender: miniArray[6], //性別
          date: date, // 確定日YYYY/MM/DD
          residence: miniArray[10], // 居住都道府県
          dead: miniArray[26], // 死者合計
          discharge: miniArray[28], // 退院数
        };
        masterDataArray.push(rowData); // 加工した1行分のデータを配列に追加
      }
      state.masterData = masterDataArray; // 加工したデータ配列でstateを上書き
    }
  },
  actions: {
    async fetchMasterData(context) {
      await axios
        .get("https://dl.dropboxusercontent.com/s/6mztoeb6xf78g5w/COVID-19.csv")
        .then(response => context.commit("addMasterData", response))
        .catch(e => {
          alert(e);
        });
    }
  },
  getters: {
    getPrefectureData(state) {
      var prefArray = PREF_ARRAY;
      var resultArray = [];
      var masterData = state.masterData;
      for (let i = 0; i < prefArray.length; i++) {
        var prefecture = { id: i, name: prefArray[i], count: 0 };
        resultArray.push(prefecture);
      }
      for (let j = 0; j < masterData.length; j++) {
        var pref = masterData[j].residence;
        var isMatch = false; // マッチしてなかったらfalse
        for (let i = 0; i < prefArray.length; i++) {
          if (pref === resultArray[i].name) {
            resultArray[i].count++;
            isMatch = true; // マッチしたらtrue
            break;
          }
        }
        if (isMatch === false) {
          // 47都道府県と不明のいずれにもマッチしなかった場合その他に追加
          resultArray[48].count++;
        }
      }
      return resultArray;
    },
    getAgeData(state) {
      var ageArray = AGE_ARRAY;
      var resultArray = [];
      var masterData = state.masterData;
      for (let i = 0; i < ageArray.length; i++) {
        var age = { id: i, name: ageArray[i], count: 0 };
        resultArray.push(age);
      }
      for (let j = 0; j < masterData.length; j++) {
        var ageData = masterData[j].age;
        var isMatch = false; // マッチしてなかったらfalse
        for (let i = 0; i < ageArray.length; i++) {
          if (ageData === resultArray[i].name) {
            resultArray[i].count++;
            isMatch = true; // マッチしたらtrue
            break;
          }
        }
        if (isMatch === false) {
          // いずれにもマッチしなかった場合その他に追加
          resultArray[10].count++;
        }
      }
      return resultArray;
    },
    getGenderData(state) {
      var genderArray = GENDER_ARRAY;
      var resultArray = [];
      var masterData = state.masterData;
      for (let i = 0; i < genderArray.length; i++) {
        var gender = { id: i, name: genderArray[i], count: 0 };
        resultArray.push(gender);
      }
      for (let j = 0; j < masterData.length; j++) {
        var genderData = masterData[j].gender;
        var isMatch = false; // マッチしてなかったらfalse
        for (let i = 0; i < genderArray.length; i++) {
          if (genderData === resultArray[i].name) {
            resultArray[i].count++;
            isMatch = true; // マッチしたらtrue
            break;
          }
        }
        if (isMatch === false) {
          // いずれにもマッチしなかった場合その他に追加
          resultArray[4].count++;
        }
      }
      return resultArray;
    }
  },
  modules: {}
});
