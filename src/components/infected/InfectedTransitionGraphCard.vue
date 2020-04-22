<template>
  <v-card outlined class="pa-3 mb-4">
    <v-card-text class="pa-0">
      <v-card-title class="title-color">感染者推移</v-card-title>
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
      <InfectedTransitionGraph
        :infected-chart-data="chartData"
        :options="options"
        :selected="selected"
      />
    </v-card-text>
  </v-card>
</template>
<script>
import InfectedTransitionGraph from "@/components/infected/InfectedTransitionGraph.vue";
export default {
  components: {
    InfectedTransitionGraph
  },
  data() {
    return {
      toggle_exclusive: undefined,
      byDayButton: true, // ボタンのdisabled
      totalButton: false, // ボタンのdisabled
      selected: "日別",
      chartData: {
        labels: ["4/1", "4/2", "4/3"],
        datasets: [
          {
            label: "感染者数",
            data: ["100", "300", "500"],
            borderColor: "#f57c00",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            radius: 3
          }
        ]
      },
      options: { responsive: true, display: true, maintainAspectRatio: false }
    };
  },
  computed: {
    setInfectedDataByTotal() {
      return this.$store.getters.getInfectedByDayTotal;
    },
    setInfectedDataByDay() {
      return this.$store.getters.getInfectedTransition;
    }
  },
  methods: {
    setChartData(infectedDataArray) {
      this.chartData.labels = infectedDataArray.map(elm =>
        this.$store.getters.dateToString(elm.date)
      );
      this.chartData.datasets[0].data = infectedDataArray.map(elm => elm.count);
    },
    switchGraph() {
      if (this.byDayButton === true) {
        // 累計ボタンが押された時
        this.setChartData(this.setInfectedDataByTotal);
        this.selected = "累計";
        this.byDayButton = false;
        this.totalButton = true;
      } else {
        // 日別ボタンが押された時
        this.setChartData(this.setInfectedDataByDay);
        this.selected = "日別";
        this.byDayButton = true;
        this.totalButton = false;
      }
    }
  },
  created() {
    var infectedDataArray = this.setInfectedDataByDay;
    this.setChartData(infectedDataArray);
  }
};
</script>
