<template>
  <v-card outlined height="100%" class="pa-3 mb-4">
    <v-card-text class="pa-0">
      <v-card-title class="title-color">死亡者数推移</v-card-title>
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
      <TransitionDead
        :dead-chart-data="deadChartData"
        :options="options"
        :selected="selected"
      />
      <div class="pa-2 overline">
        ※ 上記データは最初に事例が確認された日を起点にしています
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import TransitionDead from "@/components/dead/TransitionDead";
export default {
  components: {
    TransitionDead
  },
  data() {
    return {
      toggle_exclusive: undefined,
      byDayButton: true, // ボタンのdisabled
      totalButton: false, // ボタンのdisabled
      selected: "日別",
      deadChartData: {
        labels: ["4/1", "4/2", "4/3"],
        datasets: [
          {
            label: "死亡者数",
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
    setDeadDataByTotal() {
      return this.$store.getters.getDeadDataByTotal;
    },
    setDeadDataByDay() {
      return this.$store.getters.getDeadDataByDay;
    }
  },
  methods: {
    setChartData(deadDataArray) {
      this.deadChartData.labels = deadDataArray.map(elm =>
        this.$store.getters.dateToString(elm.date).replace("2020/", "")
      );
      this.deadChartData.datasets[0].data = deadDataArray.map(elm => elm.count);
    },
    switchGraph() {
      if (this.byDayButton === true) {
        // 累計ボタンが押された時
        this.setChartData(this.setDeadDataByTotal);
        this.selected = "累計";
        this.byDayButton = false;
        this.totalButton = true;
      } else {
        // 日別ボタンが押された時
        this.setChartData(this.setDeadDataByDay);
        this.selected = "日別";
        this.byDayButton = true;
        this.totalButton = false;
      }
    }
  },
  created() {
    var deadDataArray = this.setDeadDataByDay;
    this.setChartData(deadDataArray);
  }
};
</script>
