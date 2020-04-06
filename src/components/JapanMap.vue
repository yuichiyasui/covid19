<template>
  <v-col class="text-center">
    <GChart type="GeoChart" :data="chartData" :options="chartOptions" />
  </v-col>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  name: "JapanMap",
  components: {
    GChart,
  },
  data() {
    return {
      chartData: [],
      chartOptions: {
        region: "JP",
        resolution: "provinces",
        displayMode: "regions",
        colorAxis: {colors:['white','red']},
        magnifyingGlass:{enable: true, zoomFactor: 7.5}
      },
    };
  },
  computed: {
    getPrefectureData: function () {
      return this.$store.getters.getPrefectureData;
    },
    convertChartData: function () {
      var chartData = [["Region", "Data"]];
      this.getPrefectureData.forEach((element) => {
        if (element.name !== "不明" && element.name !== "その他") {
          var chartDataArray = [
            element.name
              .replace("県", "")
              .replace("東京都", "東京")
              .replace("府", ""),
            element.count,
          ];
          chartData.push(chartDataArray);
        }
      });
      return chartData;
    },
  },
  mounted() {
    this.chartData = this.convertChartData;
  },
};
</script>
