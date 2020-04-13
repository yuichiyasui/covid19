<template>
  <div class="text-center mt-3 pa-0">
    <GChart type="GeoChart" :data="chartData" :options="chartOptions" />
  </div>
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
        colorAxis: {maxValue:500 ,colors:['white','yellow','red']},
        keepAspectRatio:false,
      },
    };
  },
  computed: {
    getPrefectureData: function () {
      return this.$store.getters.getPrefectureData;
    },
    convertChartData: function () {
      var chartData = [["都道府県名", "感染者数"]];
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
