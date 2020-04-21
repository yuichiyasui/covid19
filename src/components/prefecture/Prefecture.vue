<template>
  <v-card outlined class="pa-3 mb-4">
    <v-card-text class="pa-0">
      <v-card-title class="title-color"
        >各都道府県の日別感染者数推移</v-card-title
      >
      <v-select
        style="width:200px"
        class="ml-auto"
        v-model="selectedPref"
        :items="items"
        label="表示する都道府県名を選択"
        color="orange"
        @change="changed()"
        outlined
        dense
      ></v-select>
      <individual-prefecture-graph
        :selected-pref="selectedPref"
        :pref-chart-data="chartData"
        :options="options"
      />
    </v-card-text>
  </v-card>
</template>
<script>
import IndividualPrefectureGraph from "@/components/prefecture/IndividualPrefectureGraph.vue";
import PREF_ARRAY from "@/assets/js/prefecture.js";
export default {
  components: {
    IndividualPrefectureGraph,
  },
  data() {
    return {
      selectedPref: PREF_ARRAY[0],
      items: PREF_ARRAY,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "感染者数",
            data: [],
            borderColor: "#f57c00",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            radius: 0, // 点の半径
            hitRadius: 2, // マウスポインタ検出のための円の半径
            borderWidth: 1, // 線の太さ
            tension: 0, // 曲線の滑らかさ
          },
        ],
      },
      options: {
        responsive: true,
        display: true,
        maintainAspectRatio: false,
        scales: { yAxes: [{ ticks: { suggestedMax: 100 } }] },
      },
    };
  },
  methods: {
    createPrefData: function() {
      var onlySelectedPrefData = this.$store.state.masterData.filter(
        (data) => data.residence === this.selectedPref
      );
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
      for (let i = 15; i <= endCount; i++) {
        var date = new Date(2020, 0, i);
        var dateObj = {
          date: date,
          count: 0,
        };
        dateArray.push(dateObj);
      }
      /** マスターデータを1行ずつみていく */
      for (let i = 0; i < onlySelectedPrefData.length; i++) {
        /** マスターデータの日付が日付オブジェクトのいずれかの日付とマッチするかみていく(絶対にどこかでマッチする) */
        try {
          for (let j = 0; dateArray.length; j++) {
            /** もしマッチしたらその日付のカウンターにプラス1してfor文を終了(マッチしない場合はスルーして次の日付へ) */
            if (
              onlySelectedPrefData[i].date.getTime() ===
              dateArray[j].date.getTime()
            ) {
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
              onlySelectedPrefData[i].date +
              "]"
          );
          break;
        }
      }
      return dateArray;
    },
    changed() {
      var prefData = this.createPrefData();
      this.chartData.datasets[0].data = prefData.map((item) => item.count);
      this.chartData.labels = prefData.map((item) =>
        item.date.toLocaleDateString().replace("2020/", "")
      );
    },
  },
  created() {
    var prefData = this.createPrefData();
    this.chartData.datasets[0].data = prefData.map((item) => item.count);
    this.chartData.labels = prefData.map((item) =>
      item.date.toLocaleDateString().replace("2020/", "")
    );
  },
};
</script>
