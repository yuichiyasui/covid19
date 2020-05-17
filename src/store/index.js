import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import PREF_ARRAY from "../assets/js/prefecture";
import AGE_ARRAY from "../assets/js/age";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    masterData: [],
    dailyChangeData: [],
    loading: true
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
        "退院数累計",
        "退院数",
        "PCR検査実施人数"
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
            dischargeTotal: miniArray[colIndexNumberArray[6]], // 退院数累計
            discharge: miniArray[colIndexNumberArray[7]], // 退院数
            pcr: miniArray[colIndexNumberArray[8]] // PCR検査数
          };
          masterDataArray.push(rowData); // 加工した1行分のデータを配列に追加
        }
      }
      state.masterData = masterDataArray; // 加工したデータ配列でstateを上書き
    },
    setIsLoading(state, isLoading) {
      state.loading = isLoading;
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
    /**
     * 日別感染者数推移の集計.
     * 国内の感染状況と感染者推移で使ってる
     */
    getInfectedTransition(state) {
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
      for (let i = 15; i <= endCount; i++) {
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
    /**
     * 日別退院者数推移の集計.
     * 国内の感染状況、退院者数グラフで使ってる
     */
    getDischargeTransition(state) {
      var masterData = Array.from(state.masterData);
      var dischargeData = masterData.filter(elm => elm.discharge !== ""); // 退院数の記載がある行のみを切り出し
      dischargeData = dischargeData.map(function(elm) {
        // 行から日付と退院数だけを詰めたオブジェクトだけの配列に変換
        return { date: elm.date, discharge: elm.discharge };
      });
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
      for (let i = 15; i <= endCount; i++) {
        var date = new Date(2020, 0, i);
        var dateObj = {
          date: date,
          count: 0
        };
        dateArray.push(dateObj);
      }
      /** 退院数データを1行ずつみていく */
      for (let i = 0; i < dischargeData.length; i++) {
        /** 退院数データの日付が日付オブジェクトのいずれかの日付とマッチするかみていく(絶対にどこかでマッチする) */
        try {
          for (let j = 0; dateArray.length; j++) {
            /** もしマッチしたらその日付のカウンターに退院数を代入してfor文を終了(マッチしない場合はスルーして次の日付へ) */
            if (
              dischargeData[i].date.getTime() === dateArray[j].date.getTime()
            ) {
              dateArray[j].count += Number(dischargeData[i].discharge);
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
    /**
     * 日別死者数推移の集計.
     * 国内の感染状況、死者数推移で使ってる
     */
    getDeadDataByDay(state) {
      var masterData = Array.from(state.masterData);
      var deadData = masterData.filter(elm => elm.dead !== ""); // 死者合計の入った行だけ切り出し
      deadData = deadData.map(function(elm) {
        // 行から日付と死者合計だけを詰めたオブジェクトだけの配列に変換
        return { date: elm.date, dead: elm.dead };
      });
      var resultArray = [];
      for (let i = 0; i < deadData.length; i++) {
        if (i === 0) {
          // 1回目は比較する前日がないためそのままpush
          let result = {
            date: deadData[i].date,
            count: Number(deadData[i].dead)
          };
          resultArray.push(result); // 文字列になって格納されるためNumberで数値型に変換
        } else {
          if (deadData[i].dead === deadData[i - 1].dead) {
            // 当日と前日が同じ場合0をpush
            let result = {
              date: deadData[i].date,
              count: 0
            };
            resultArray.push(result);
          } else {
            // 前日より死者数が増加していれば、差分をpush
            let result = {
              date: deadData[i].date,
              count: deadData[i].dead - deadData[i - 1].dead
            };
            resultArray.push(result);
          }
        }
      }
      return resultArray;
    },
    /**
     * 累計死者数推移の集計.
     * 国内の感染状況、死者数推移で使ってる
     */
    getDeadDataByTotal(state) {
      var masterData = Array.from(state.masterData);
      var deadData = masterData.filter(elm => elm.dead !== ""); // 死者合計の入った行だけ切り出し
      var resultArray = deadData.map(function(elm) {
        // 行から日付と死者合計だけを詰めたオブジェクトだけの配列に変換
        return { date: elm.date, count: elm.dead };
      });
      return resultArray;
    },
    /**
     * 各所で使っている日付→文字列の変換メソッド
     */
    dateToString: () => date => {
      return (
        date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
      );
    },
    /**
     * 都道府県別累計感染者数の集計.
     * 都道府県、日本地図で使ってる
     */
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

    /**
     * 退院者数グラフで使ってる??
     */
    getDischarge(state) {
      //配列の中から必要なdeadだけの配列を作成
      const dischargeArray = state.masterData.map(x => x.discharge);
      return Math.max.apply(null, dischargeArray);
    },
    /**
     * 年代別日別感染者数の集計.
     * 年代日別グラフで使ってる
     */
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
            count: 0
          };
          dateArray.push(dateObj);
        }
        var age = {
          id: i,
          name: ageArray[i],
          dateArray: dateArray
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
    getInfectedByDayTotal(state) {
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
      for (let i = 15; i <= endCount; i++) {
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
      var resultArray = [];
      for (let i = 0; i < dateArray.length; i++) {
        if (i === 0) {
          // 1回目は比較する前日がないためそのままpush
          let result = {
            date: dateArray[i].date,
            count: dateArray[i].count
          };
          resultArray.push(result); // 文字列になって格納されるためNumberで数値型に変換
        } else {
          if (dateArray[i].count === dateArray[i - 1].count) {
            // 当日と前日が同じ場合0をpush
            let result = {
              date: dateArray[i].date,
              count: resultArray[i - 1].count + dateArray[i].count //1 === 1などの時に足す
            };
            resultArray.push(result);
          } else {
            // 前日より増加していれば、差分をpush
            let result = {
              date: dateArray[i].date,
              count: dateArray[i].count + resultArray[i - 1].count
            };
            resultArray.push(result);
          }
        }
      }
      return resultArray;
    },
    /**
     * PCR検査数累計推移
     */
    getPcrTransition(state) {
      var masterData = state.masterData;
      var pcrData = masterData.filter(elm => elm.pcr !== "");
      var resultArray = pcrData.map(function(elm) {
        // 行から日付とPCR検査数合計だけを詰めたオブジェクトだけの配列に変換
        return { date: elm.date, count: elm.pcr };
      });
      return resultArray;
    },
    getPcrByDay() {},
    /**
     * PCR検査数の日別推移グラフの集計.
     */
    getPcrDataByDay(state) {
      var masterData = Array.from(state.masterData);
      var pcrData = masterData.filter(elm => elm.pcr !== ""); // 死者合計の入った行だけ切り出し
      pcrData = pcrData.map(function(elm) {
        // 行から日付と死者合計だけを詰めたオブジェクトだけの配列に変換
        return { date: elm.date, pcr: elm.pcr };
      });
      var resultArray = [];
      for (let i = 0; i < pcrData.length; i++) {
        if (i === 0) {
          // 1回目は比較する前日がないためそのままpush
          let result = {
            date: pcrData[i].date,
            count: Number(pcrData[i].pcr)
          };
          resultArray.push(result); // 文字列になって格納されるためNumberで数値型に変換
        } else {
          if (pcrData[i].pcr === pcrData[i - 1].pcr) {
            // 当日と前日が同じ場合0をpush
            let result = {
              date: pcrData[i].date,
              count: 0
            };
            resultArray.push(result);
          } else {
            // 前日より死者数が増加していれば、差分をpush
            let result = {
              date: pcrData[i].date,
              count: pcrData[i].pcr - pcrData[i - 1].pcr
            };
            if (result.count < 0) {
              // 元データが不正で前日との差分がマイナスになる場合、0にする
              result.count = 0;
            }
            resultArray.push(result);
          }
        }
      }
      return resultArray;
    },
    /**
     * 累計退院数の推移を集計.
     * 国内の感染状況、退院数グラフで使ってる
     */
    getDischergeByDayTotal(state){
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
      for (let i = 15; i <= endCount; i++) {
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
              dateArray[j].count = Number(dateArray[j].count) + Number(masterData[i].discharge);
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
      var resultArray = [];
      for (let i = 0; i < dateArray.length; i++) {
        if (i === 0) {
          // 1回目は比較する前日がないためそのままpush
          let result = {
            date: dateArray[i].date,
            count: dateArray[i].count
          };
          resultArray.push(result); // 文字列になって格納されるためNumberで数値型に変換
        } else {
          if (dateArray[i].count === dateArray[i - 1].count) {
            // 当日と前日が同じ場合0をpush
            let result = {
              date: dateArray[i].date,
              count: resultArray[i - 1].count + dateArray[i].count //1 === 1などの時に足す
            };
            resultArray.push(result);
          } else {
            // 前日より増加していれば、差分をpush
            let result = {
              date: dateArray[i].date,
              count: dateArray[i].count + resultArray[i - 1].count
            };
            resultArray.push(result);
          }
        }
      }
      return resultArray;
    }
  }
});
