<template>
  <v-card outlined class="pa-3 mb-4">
    <v-card-text class="pa-0">
      <v-card-title class="title-color">PCR検査数推移</v-card-title>
      <v-row align="center" justify="center">
        <v-btn-toggle
          v-model="toggle_exclusive"
          mandatory
          class="ml-auto mr-5"
          dense
        >
          <v-btn :disabled="byDayButton" @click="switchGraph()">
            日別
          </v-btn>
          <v-btn :disabled="totalButton" @click="switchGraph()">
            累計
          </v-btn>
        </v-btn-toggle>
      </v-row>
      <PcrTransitionGraph
        :pcr-chart-data="chartData"
        :options="options"
        :selected="selected"
      />
      <div class="pa-2 overline">
        ※ 上記グラフは最初にデータ上の事例が確認された日を起点にしています
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import PcrTransitionGraph from "@/components/pcr/PcrTransitionGraph.vue";
export default {
  components: {
    PcrTransitionGraph
  },
  data() {
    return {
      toggle_exclusive: undefined,
      byDayButton: true, // ボタンのdisabled
      totalButton: false, // ボタンのdisabled
      chartData: {
        labels: ["4/1", "4/2", "4/3"],
        datasets: [
          {
            label: "PCR検査数",
            data: [100, 200, 400],
            borderColor: "#f57c00",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            radius: 0,
            hitRadius: 4, // マウスポインタ検出のための円の半径
            borderWidth: 2 // 線の太さ
          }
        ]
      },
      options: { responsive: true, display: true, maintainAspectRatio: false },
      selected: "日別"
    };
  },
  computed: {
    getPcrTotal() {
      return this.$store.getters.getPcrTransition;
    },
    getPcrByDay() {
      return this.$store.getters.getPcrDataByDay;
    }
  },
  methods: {
    setChartData(pcrDataArray) {
      this.chartData.labels = pcrDataArray.map(elm =>
        this.$store.getters.dateToString(elm.date).replace("2020/", "")
      );
      this.chartData.datasets[0].data = pcrDataArray.map(elm => elm.count);
    },
    switchGraph() {
      if (this.byDayButton === true) {
        // 累計ボタンが押された時
        this.setChartData(this.getPcrTotal);
        this.selected = "累計";
        this.byDayButton = false;
        this.totalButton = true;
      } else {
        // 日別ボタンが押された時
        this.setChartData(this.getPcrByDay);
        this.selected = "日別";
        this.byDayButton = true;
        this.totalButton = false;
      }
    }
  },
  created() {
    var pcrDataArray = this.getPcrByDay; // 最初は日別にする
    this.setChartData(pcrDataArray);
  }
};
</script>
