<template>
  <v-card outlined height="100%" class="pa-3 mb-4">
    <v-card-text class="pa-0">
      <v-card-title class="title-color">退院者数推移</v-card-title>
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
      <DischargeTransitionGraph
        :discharge-chart-data="dischargeChartData"
        :options="options"
        :selected="selected"
      />
    </v-card-text>
  </v-card>
</template>
<script>
import DischargeTransitionGraph from "@/components/discharge/DischargeTransitionGraph.vue";
export default {
  components: {
    DischargeTransitionGraph
  },
  data() {
    return {
      toggle_exclusive: undefined,
      byDayButton: true, // ボタンのdisabled
      totalButton: false, // ボタンのdisabled
      selected: "日別",
      dischargeChartData: {
        labels: ["4/1", "4/2", "4/3"],
        datasets: [
          {
            label: "退院者数",
            data: [10, 20, 30],
            borderColor: "#f57c00",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            radius: 0,
            hitRadius: 4, // マウスポインタ検出のための円の半径
            borderWidth: 2, // 線の太さ
          }
        ]
      },
      options: { responsive: true, display: true, maintainAspectRatio: false }
    };
  },
  computed: {
    getDischargeByDay() { // 日別
      return this.$store.getters.getDischargeTransition;
    },
    getDischargeTotal(){  // 累計
      return this.$store.getters.getDischergeByDayTotal;
    }
  },
  methods: {
    setChartData(dischargeDataArray) {
      this.dischargeChartData.labels = dischargeDataArray.map(elm =>
        this.$store.getters.dateToString(elm.date).replace("2020/", "")
      );
      this.dischargeChartData.datasets[0].data = dischargeDataArray.map(
        elm => elm.count
      );
    },
    switchGraph() {
      if (this.byDayButton === true) {
        // 累計ボタンが押された時
        this.setChartData(this.getDischargeTotal);
        this.selected = "累計";
        this.byDayButton = false;
        this.totalButton = true;
      } else {
        // 日別ボタンが押された時
        this.setChartData(this.getDischargeByDay);
        this.selected = "日別";
        this.byDayButton = true;
        this.totalButton = false;
      }
    }
  },
  created() {
    var dischargeDataArray = this.getDischargeByDay;
    this.setChartData(dischargeDataArray);
  }
};
</script>
