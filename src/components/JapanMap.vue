<template>
  <v-card outlined class="pa-3 mb-4">
    <v-card-text class="pa-0">
      <v-card-title class="title-color"
        >日本国内感染者数分布マップ</v-card-title
      >
      <div id="japan-map-frame" class="text-center mt-3 pa-0">
        <GChart
          type="GeoChart"
          :style="{ width: chartWidth + 'px' }"
          :data="chartData"
          :options="chartOptions"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  name: "JapanMap",
  components: {
    GChart
  },
  data() {
    return {
      chartWidth: 800,
      chartData: [],
      chartOptions: {
        region: "JP",
        backgroundColor: "#e9e9e9",
        resolution: "provinces",
        displayMode: "regions",
        colorAxis: { maxValue: 1000, colors: ["white", "yellow", "red"] },
        keepAspectRatio: true
      }
    };
  },
  computed: {
    getPrefectureData: function() {
      return this.$store.getters.getPrefectureData;
    },
    convertChartData: function() {
      var chartData = [["都道府県名", "感染者数"]];
      this.getPrefectureData.forEach(element => {
        if (element.name !== "不明" && element.name !== "その他") {
          var chartDataArray = [
            element.name
              .replace("県", "")
              .replace("東京都", "東京")
              .replace("府", ""),
            element.count
          ];
          chartData.push(chartDataArray);
        }
      });
      return chartData;
    }
  },
  mounted() {
    this.chartData = this.convertChartData;
    var japanMapFrame = document.getElementById("japan-map-frame");
    var listener = function() {
      // イベントリスナーで呼ぶ処理の定義
      japanMapFrame.scrollLeft = japanMapFrame.scrollWidth * 0.28; // X方向に日本地図が真ん中に来るように調整
      japanMapFrame.scrollTop = 5; // Y方向に日本地図が真ん中に来るように調整
      window.removeEventListener("scroll", listener, false); // イベントリスナーの破棄
    };
    window.addEventListener("scroll", listener, false); // イベントリスナーの登録
  }
};
</script>
<style>
#japan-map-frame {
  overflow: scroll;
  width: 100%;
  height: 386px; /* scrollTopが効かなくなるため定数で定義 */
}
</style>
