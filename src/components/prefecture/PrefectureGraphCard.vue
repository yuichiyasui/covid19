<template>
  <v-card height="100%" outlined class="pa-3 mb-4">
    <v-card-text class="pa-0">
      <v-card-title class="title-color">都道府県別累積感染者数</v-card-title>
      <div id="prefecture-graph-frame">
        <PrefectureGraph
          style="width:1000px;"
          :pref-chart-data="prefChartData"
          :options="options"
        ></PrefectureGraph>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import PrefectureGraph from "@/components/prefecture/PrefectureGraph";
export default {
  components: {
    PrefectureGraph
  },
  data() {
    return {
      prefChartData: {
        labels: [],
        datasets: [
          {
            label: "感染者数",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            borderColor: "#f57c00",
            borderWidth: 1,
            data: []
          }
        ]
      },
      options: {
        tooltips: {
          callbacks: {
            title: function(tooltipItem) {
              return tooltipItem[0].xLabel.join(""); // 1文字ずつの配列になっているのを元通りに
            }
          }
        },
        legend: { position: "top", reverse: true },
        responsive: true,
        display: true,
        maintainAspectRatio: false, // アスペクト比を維持するかの設定
        scales: { xAxes: [{ ticks: { autoSkip: false } }] } // y軸は項目を表示する際に間引かない
      }
    };
  },
  methods: {
    setChartData() {
      var prefectureData = this.$store.getters.getPrefectureData;
      prefectureData = prefectureData.sort(function(a, b) {
        if (a.count < b.count) {
          return 1;
        } else {
          return -1;
        }
      });
      /** その他と不明を最後尾に移動 */
      var others = prefectureData.find(item => item.name === "その他");
      var indexOfOthers = prefectureData.findIndex(
        item => item.name === "その他"
      );
      prefectureData.splice(indexOfOthers, 1);
      prefectureData.push(others);
      var unknown = prefectureData.find(item => item.name === "不明");
      var indexOfUnknown = prefectureData.findIndex(
        item => item.name === "不明"
      );
      prefectureData.splice(indexOfUnknown, 1);
      prefectureData.push(unknown);

      this.prefChartData.labels = prefectureData
        .map(elm => elm.name)
        .map(elm => elm.split("")); // 縦書きに加工
      this.prefChartData.datasets[0].data = prefectureData.map(
        elm => elm.count
      );
    }
  },
  created() {
    this.setChartData();
  }
};
</script>
