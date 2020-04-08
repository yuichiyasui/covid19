import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import PREF_ARRAY from "../assets/js/prefecture";

Vue.use(Vuex);
Vue.use(axios);

export default new Vuex.Store({
  state: {
    masterData: [],
  },
  mutations: {
    addMasterData(state, masterData) {
      var bigArray = []; // 1行ずつを格納する配列
      bigArray = masterData.data.split("\r\n"); // 1行ごとに分割して配列に格納
      bigArray.splice(0, 1); // 項目名の行を削除
      var masterDataArray = []; // 必要なデータだけを格納する配列
      for (var i = 0; i < bigArray.length; i++) {
        var miniArray = bigArray[i].split(","); // 1行の各項目を配列に格納
        var status = // ステータス：死亡のフォーマット
          miniArray[17].indexOf("死亡") != -1 ? "死亡" : miniArray[17];
        var rowData = {
          // 必要な行だけ切り取って連想配列にする
          age: miniArray[5], // 年代
          gender: miniArray[6], //性別
          date: miniArray[7], // 確定日
          residence: miniArray[10], // 居住都道府県
          status: status, // ステータス('退院' or '死亡' or '')
        };
        masterDataArray.push(rowData); // 加工した1行分のデータを配列に追加
      }
      state.masterData = masterDataArray; // 加工したデータ配列でstateを上書き
    },
  },
  actions: {
    async fetchMasterData(context) {
      await axios
        .get("https://dl.dropboxusercontent.com/s/6mztoeb6xf78g5w/COVID-19.csv")
        .then((response) => context.commit("addMasterData", response))
        .catch((e) => {
          alert(e);
        });
    },
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

    // 修正後：masterData[i].dateがDate型である前提
    // ただし、"日数(2020年1月1日から今日までの) + 全レコード数 × マッチするまでの日数"の回数だけfor文が呼ばれるため効率的にいいかは微妙
    getDate(state) {
      var masterData = state.masterData;
      var dateArray = []; // 日別感染者数の集計結果を格納する配列
      /** 日付とカウンターをプロパティにした日付オブジェクトを2020年1月1日から今日の分まで生成して配列に格納 */
      for (var date = new Date(2020, 0, 1); date.getTime() < new Date().getTime(); date.setDate(date.getDate() + 1)) {
        var dateObj = {
          date: date, 
          count: 0
        };
        dateArray.push(dateObj);
      }
      /** マスターデータを1行ずつみていく */
      for (let i = 0; i < masterData.length; i++) {
        /** マスターデータの日付が日付オブジェクトのいずれかの日付とマッチするかみていく(絶対にどこかでマッチする) */
        for (let j = 0; dateArray.length; j++) {
          /** もしマッチしたらその日付のカウンターにプラス1してfor文を終了(マッチしない場合はスルーして次の日付へ) */
          if (masterData[i].date.getTime() === dateArray[j].date.getTime()) {
            dateArray[j].count++;
            break;
          }
        }
      }
      console.log(new Date(2020, 0, 1));
      console.log(new Date().getTime());
      return dateArray;
    }

    // getDate(state){
    //   var masterData = state.masterData;
    //   var totalDate = []; //counter付配列
    //   // var first = true;
    //   var b = [];

    //   for (let i = 0; i < masterData.length; i++) {
    //     var allDate = { id: i, name: masterData[i].date, count: 0 };
    //     totalDate.push(allDate);
    //   }
    //   for(let i = 0; i < totalDate.length; i++){
    //     // if(first){
    //     //   b.push(totalDate[i]);
    //     //   b[0].count++;
    //     //   first = false;
    //     // }

    //     if(b === null){
    //       b.push(totalDate[i - 1]);
    //       b[i -1].count++;
    //     }
    //     // if(totalDate[i].name === allDate.name){
    //     //   totalDate[i].count++;
    //     // }
    //   }
    //       // if(totalDate[0].name !== allDate.name){
    //       //   totalDate.push(allDate);
    //       // }
    //       // for(let j = 0; j < totalDate.length; j++){
    //       //   if(totalDate[j].name === allDate.name){
    //       //     totalDate[j].count++;
    //       //   } else {
    //       //       totalDate.push(allDate);
    //       //     }
    //       // }
    //   return b;
    // }
  },
  modules: {},
});
