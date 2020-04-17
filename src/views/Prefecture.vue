<template>
  <v-col sm="8">
    <v-card>
      <v-card-text>
        <v-select
          v-model="selectedPref"
          :items="items"
          label="表示する都道府県名を選択"
          color="orange"
          outlined
          dense
        ></v-select>
        <v-btn @click="test()">console.log</v-btn>
        <individual-prefecture-graph
          :pref-chart-data="chartData"
          :options="options"
        />
      </v-card-text>
    </v-card>
  </v-col>
</template>
<script>
import IndividualPrefectureGraph from "@/components/IndividualPrefectureGraph.vue";
import PREF_ARRAY from "../assets/js/prefecture";
export default {
  components: {
    IndividualPrefectureGraph
  },
  data() {
    return {
      selectedPref: PREF_ARRAY[0],
      items: PREF_ARRAY,
      chartData: {
        labels: [],
        // labels: this.createPrefData.map(item=>item.date),
        datasets: [
          {
            label: "感染者数",
            data: [100,200,300,100,200,517],
            // data: this.createPrefData.map(item=>item.count),
            borderColor: "#f57c00",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            radius: 3
          }
        ]
      },
      options: { responsive: true, display: true, maintainAspectRatio: false }
    };
  },
  methods: {
    createPrefData: function() {
      var onlySelectedPrefData = this.$store.state.masterData.filter(
        data => data.residence === this.selectedPref
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
      for (let i = 1; i <= endCount; i++) {
        var date = new Date(2020, 0, i);
        var dateObj = {
          date: date,
          count: 0
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
    test() {
      console.log(this.selectedPref);
    }
  },
  created() {
    var prefData = this.createPrefData();
    this.chartData.datasets[0].data = prefData.map(item => item.count);
    this.chartData.labels = prefData.map(item => item.date.toLocaleString());
  }
};
</script>
