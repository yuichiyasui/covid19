import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import PREF_ARRAY from "../assets/js/prefecture";
import AGE_ARRAY from "../assets/js/age";
import InfectedPeople from "./modules/infectedPeople";
import ageGraph from "./modules/ageGraph";
import ageDayGraph from "./modules/ageDayGraph";
import chart from "./modules/chart";
import dischargeTransitionGraph from "./modules/dischargeTransitionGraph";
import IndividualPrefectureGraph from "./modules/IndividualPrefectureGraph";
import infectedPeople from "./modules/infectedPeople";
import japanMap from "./modules/japanMap";
import prefectureGraph from "./modules/prefectureGraph";
import totalDead from "./modules/totalDead";
import transitionDead from "./modules/transitionDead";
import transitionGraph from "./modules/transitionGraph";

Vue.use(Vuex);
Vue.use(axios);

export default new Vuex.Store({
  modules: {
    InfectedPeople,
    ageGraph,
    ageDayGraph,
    chart,
    dischargeTransitionGraph,
    IndividualPrefectureGraph,
    infectedPeople,
    japanMap,
    prefectureGraph,
    totalDead,
    transitionDead,
    transitionGraph,
  },
  state: {
    masterData: [],
    dailyChangeData: [],
    is_loading: false,
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
        "退院数",
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
            discharge: miniArray[colIndexNumberArray[6]], // 退院数
          };
          masterDataArray.push(rowData); // 加工した1行分のデータを配列に追加
        }
      }
      state.masterData = masterDataArray; // 加工したデータ配列でstateを上書き
    },
    setIsLoading(state, isLoading) {
      state.is_loading = isLoading;
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

    dateToString: () => (date) => {
      return (
        date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
      );
    },
    getDeadDeta(state) {
      //配列の中から必要なdeadだけの配列を作成
      const deadarray = state.masterData.map((x) => x.dead);
      return Math.max.apply(null, deadarray);
    },
    getDeadTransition(state) {
      //配列の中から死者数の値がある物を検出する
      var newDate = state.masterData.filter((item) => item.dead !== "");
      //重複排除
      let values = [];
      const deadTransition = newDate.filter((e) => {
        if (values.indexOf(e["dead"]) === -1) {
          values.push(e["dead"]);
          return e;
        }
      });
      return deadTransition;
    },
    getDischarge(state) {
      //配列の中から必要なdeadだけの配列を作成
      const dischargeArray = state.masterData.map((x) => x.discharge);
      return Math.max.apply(null, dischargeArray);
    },
    getDischargeTransition(state) {
      //配列の中から死者数の値がある物を検出する
      var newDate = state.masterData.filter((item) => item.discharge !== "");
      //重複排除
      let values = [];
      const dischargeTransition = newDate.filter((e) => {
        if (values.indexOf(e["discharge"]) === -1) {
          values.push(e["discharge"]);
          return e;
        }
      });
      return dischargeTransition;
    },
    getAgeDay(state) {
      //年代別の配列
      var ageArray = AGE_ARRAY;
      //全ての結果の配列
      var resultArray = [];
      for (let i = 0; i < ageArray.length; i++) {
        // 日別のデータを格納する配列
        var dateArray = [];
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
        for (let j = 15; j <= endCount; j++) {
          var date = new Date(2020, 0, j);
          var dateObj = {
            date: date,
            count: 0,
          };
          dateArray.push(dateObj);
        }

        var age = {
          id: i,
          name: ageArray[i],
          dateArray: dateArray,
        };
        resultArray.push(age);
      }

      var masterData = state.masterData;
      /** マスターデータを1行ずつみていく */
      for (let i = 0; i < masterData.length; i++) {
        var ageData = masterData[i].age;
        var isMatch = false; // マッチしてなかったらfalse
        for (let j = 0; j < ageArray.length; j++) {
          if (ageData == Number(resultArray[j].name)) {
            isMatch = true; // マッチしたらtrue
            try {
              for (let k = 0; resultArray[j].dateArray.length; k++) {
                /** もしマッチしたらその日付のカウンターにプラス1してfor文を終了(マッチしない場合はスルーして次の日付へ) */
                if (
                  masterData[i].date.getTime() ===
                  resultArray[j].dateArray[k].date.getTime()
                ) {
                  resultArray[j].dateArray[k].count++;

                  break;
                }
              }
            } catch (error) {
              console.error(
                error.name +
                  ": " +
                  error.message +
                  "[this date: " +
                  masterData[i].date +
                  "]"
              );
              break;
            }
          }
          // "1-10,不明"
          if (isMatch === false) {
            if (ageData == resultArray[j].name) {
              try {
                for (let k = 0; resultArray[j].dateArray.length; k++) {
                  /** もしマッチしたらその日付のカウンターにプラス1してfor文を終了(マッチしない場合はスルーして次の日付へ) */
                  if (
                    masterData[i].date.getTime() ===
                    resultArray[j].dateArray[k].date.getTime()
                  ) {
                    resultArray[j].dateArray[k].count++;
                    break;
                  }
                }
              } catch (error) {
                console.error(
                  error.name +
                    ": " +
                    error.message +
                    "[this date: " +
                    masterData[i].date +
                    "]"
                );
                break;
              }
            }
          }
        }
      }

      return resultArray;
    },
    getDailyChangeData(state) {
      var masterData = state.masterData;
      var dateArray = []; // 日別の集計結果を格納する配列
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
          infectedCount: 0,
          totalDeadCount: 0,
          deadCount: 0,
          dischargeCount: 0,
          totalDischargeCount: 0,
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
              dateArray[j].infectedCount++;
              dateArray[j].deadCount =
                Number(masterData[i].dead);
              dateArray[j].totalDeadCount = Number(masterData[i].dead);
              dateArray[j].dischargeCount =
                Number(dateArray[j].dischargeCount) +
                Number(masterData[i].discharge);
              dateArray[j].totalDischargeCount =
                Number(dateArray[j - 1].totalDischargeCount) +
                Number(masterData[i].discharge);
              break;
            }
          }
        } catch (error) {
          console.error(
            error.name +
              ": " +
              error.message +
              "[this date: " +
              masterData[i].date +
              "]"
          );
          break;
        }
      }
      return dateArray;
    },
  },
});
