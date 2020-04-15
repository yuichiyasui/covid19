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
    masterData: [],
    is_loading: false
  },
  mutations: {
    addMasterData(state, masterData) {
      var bigArray = []; // 1行ずつを格納する配列
      bigArray = masterData.data.split("\r\n"); // 1行ごとに分割して配列に格納
      var searchColArray = [
        // 取得する項目の一覧(これをもとにcolIndexNumberArrayに項目番号をセットする)
        "通し",
        "年代",
        "性別",
        "確定日",
        "居住都道府県",
        "死者合計",
        "退院数"
      ];
      var colArray = bigArray[0].split(","); // 項目名だけを各項目ごとに分割して配列に格納
      var colIndexNumberArray = []; // 項目番号を格納する配列
      for (let i = 0; i < searchColArray.length; i++) {
        // 検索したい項目の項目番号を取得して配列に格納
        colIndexNumberArray.push(colArray.indexOf(searchColArray[i]));
      }
      bigArray.splice(0, 1); // 項目名の行を削除
      var masterDataArray = []; // 必要なデータだけを格納する配列
      for (let i = 0; i < bigArray.length; i++) {
        var miniArray = bigArray[i].split(","); // 1行の各項目を配列に格納
        if (miniArray[colIndexNumberArray[0]] !== "") {
          // 空文字の行(年代の項目で判定)じゃなかった場合
          var arr = miniArray[colIndexNumberArray[3]].split("/"); // yyyy/MM/ddを'/'で分割
          var date = new Date(arr[2], arr[0] - 1, arr[1]); // yyyy,MM,ddでDateオブジェクトを生成
          var rowData = {
            // 必要な行だけ切り取って連想配列にする
            num: miniArray[colIndexNumberArray[0]], // 通し
            age: miniArray[colIndexNumberArray[1]], // 年代
            gender: miniArray[colIndexNumberArray[2]], //性別
            date: date, // 確定日
            residence: miniArray[colIndexNumberArray[4]], // 居住都道府県
            dead: miniArray[colIndexNumberArray[5]], // 死者合計
            discharge: miniArray[colIndexNumberArray[6]] // 退院数
          };
          masterDataArray.push(rowData); // 加工した1行分のデータを配列に追加
        }
      }
      state.masterData = masterDataArray; // 加工したデータ配列でstateを上書き
    },
    setIsLoading(state, isLoading) {
      state.is_loading = isLoading;
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
          if (ageData == Number(resultArray[i].name)) {
            resultArray[i].count++;
            isMatch = true; // マッチしたらtrue
            break;
          }
          // "1-10,不明"
          if (isMatch === false) {
            if (ageData == resultArray[i].name) {
              resultArray[i].count++;
              break;
            }
          }
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
    },
    dateToString: () => date => {
      return (
        date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
      );
    },
    getDates(state) {
      var masterData = state.masterData;
      var dateArray = []; // 日別感染者数の集計結果を格納する配列
      /** 日付とカウンターをプロパティにした日付オブジェクトを2020年1月1日から今日の分まで生成して配列に格納 */
      var preToday = new Date();
      var today = new Date(
        preToday.getFullYear(),
        preToday.getMonth(),
        preToday.getDate(),
        0,
        0
      );
      var startDate = new Date(2020, 0, 1, 0, 0);
      var ms = today.getTime() - startDate.getTime();
      var endCount = ms / (1000 * 60 * 60 * 24) + 1;
      for (let i = 1; i <= endCount; i++) {
        var date = new Date(2020, 0, i);
        var dateObj = {
          date: date,
          count: 0
        };
        dateArray.push(dateObj);
      }
      /** マスターデータを1行ずつみていく */
      for (let i = 0; i < masterData.length; i++) {
        /** マスターデータの日付が日付オブジェクトのいずれかの日付とマッチするかみていく(絶対にどこかでマッチする) */
        try {
          for (let j = 0; dateArray.length; j++) {
            /** もしマッチしたらその日付のカウンターにプラス1してfor文を終了(マッチしない場合はスルーして次の日付へ) */
            if (masterData[i].date.getTime() === dateArray[j].date.getTime()) {
              dateArray[j].count++;
              break;
            }
          }
        } catch (error) {
          console.error(error.name + ": " + error.message + "[this date: "+ masterData[i].date + "]")
          break;
        }
      }
      return dateArray;
    },
    getDeadDeta(state) {
      //配列の中から必要なdeadだけの配列を作成
      const deadarray = state.masterData.map(x => x.dead);
      return Math.max.apply(null, deadarray);
    },
    getDeadTransition(state) {
      //配列の中から死者数の値がある物を検出する
      var newDate = state.masterData.filter(item => item.dead !== "");
      //重複排除
      let values = [];
      const deadTransition = newDate.filter(e => {
        if (values.indexOf(e["dead"]) === -1) {
          values.push(e["dead"]);
          return e;
        }
      });
      return deadTransition;
    },
    getDischarge(state) {
      //配列の中から必要なdeadだけの配列を作成
      const dischargeArray = state.masterData.map(x => x.discharge);
      return Math.max.apply(null, dischargeArray);
    },
    getDischargeTransition(state) {
      //配列の中から死者数の値がある物を検出する
      var newDate = state.masterData.filter(item => item.discharge !== "");
      //重複排除
      let values = [];
      const dischargeTransition = newDate.filter(e => {
        if (values.indexOf(e["discharge"]) === -1) {
          values.push(e["discharge"]);
          return e;
        }
      });
      return dischargeTransition;
    },
    /**退院数を日別に集計 */
    getDischargeDates(state) {
      var masterData = state.masterData;
      var dateArray = []; // 日別感染者数の集計結果を格納する配列
      /** 日付とカウンターをプロパティにした日付オブジェクトを2020年1月1日から今日の分まで生成して配列に格納 */
      var preToday = new Date();
      var today = new Date(
        preToday.getFullYear(),
        preToday.getMonth(),
        preToday.getDate(),
        0,
        0
      );
      var startDate = new Date(2020, 0, 1, 0, 0);
      var ms = today.getTime() - startDate.getTime();
      var endCount = ms / (1000 * 60 * 60 * 24) + 1;
      for (let i = 1; i <= endCount; i++) {
        var date = new Date(2020, 0, i);
        var dateObj = {
          date: date,
          todayDischarge: 0,
          totalDischarge: 0,
        };
        dateArray.push(dateObj);
      }

      /** マスターデータを1行ずつみていく */
      for (let i = 0; i < masterData.length; i++) {
        /** マスターデータの日付が日付オブジェクトのいずれかの日付とマッチするかみていく(絶対にどこかでマッチする) */
        try {
          for (let j = 0; dateArray.length; j++) {
            /** もしマッチしたらその日付のカウンターにプラス1してfor文を終了(マッチしない場合はスルーして次の日付へ) */
            if (masterData[i].date.getTime() === dateArray[j].date.getTime()) {
              dateArray[j].todayDischarge = Number(dateArray[j].todayDischarge) + Number(masterData[i].discharge);
              //totalDischargeを増やしていきたい
              dateArray[j].totalDischarge = Number(dateArray[j - 1].totalDischarge) + Number(masterData[i].discharge);
              break;
            }
          }
        } catch (error) {
          console.error(error.name + ": " + error.message + "[this date: "+ masterData[i].date + "]")
          break;
        }
      }
      return dateArray;
    },
    /**死者数を日別に集計 */
    getDeadDates(state) {
      var masterData = state.masterData;
      var dateArray = []; // 日別感染者数の集計結果を格納する配列
      /** 日付とカウンターをプロパティにした日付オブジェクトを2020年1月1日から今日の分まで生成して配列に格納 */
      var preToday = new Date();
      var today = new Date(
        preToday.getFullYear(),
        preToday.getMonth(),
        preToday.getDate(),
        0,
        0
      );
      var startDate = new Date(2020, 0, 1, 0, 0);
      var ms = today.getTime() - startDate.getTime();
      var endCount = ms / (1000 * 60 * 60 * 24) + 1;
      for (let i = 1; i <= endCount; i++) {
        var date = new Date(2020, 0, i);
        var dateObj = {
          date: date,
          todayDead: 0,
          totalDead: 0,
        };
        dateArray.push(dateObj);
      }

      /** マスターデータを1行ずつみていく */
      for (let i = 0; i < masterData.length; i++) {
        /** マスターデータの日付が日付オブジェクトのいずれかの日付とマッチするかみていく(絶対にどこかでマッチする) */
        try {
          for (let j = 0; dateArray.length; j++) {
            /** もしマッチしたらその日付のカウンターにプラス1してfor文を終了(マッチしない場合はスルーして次の日付へ) */
            if (masterData[i].date.getTime() === dateArray[j].date.getTime()) {
              dateArray[j].todayDead = Number(dateArray[j].todayDead) + Number(masterData[i].dead);
              dateArray[j].totalDead = Number(dateArray[j - 1].totalDead) + Number(masterData[i].dead);
              break;
            }
          }
        } catch (error) {
          console.error(error.name + ": " + error.message + "[this date: "+ masterData[i].date + "]")
          break;
        }
      }
      return dateArray;
    },
  },

  modules: {}
});
