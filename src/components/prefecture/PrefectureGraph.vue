<script>
import { Bar } from "vue-chartjs";

export default {
  data() {
    return {
      prefectureData: [],
      options: {
        tooltips: {
          callbacks: {
            title: function(tooltipItem) {
              return tooltipItem[0].xLabel.join('');  // 1文字ずつの配列になっているのを元通りに
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
  computed: {
    getPrefectureName: function() {
      var prefectureNameArray = [];
      this.prefectureData.forEach(element => {
        prefectureNameArray.push(element.name);
      });
      return prefectureNameArray;
    },
    getPrefectureCount: function() {
      var prefectureCountArray = [];
      this.prefectureData.forEach(element => {
        prefectureCountArray.push(element.count);
      });
      return prefectureCountArray;
    }
  },
  methods: {
    setChartData() {
      this.chartData = {
        labels: this.getPrefectureName.map(v => v.split("")), // 縦書きに加工
        datasets: [
          {
            label: "感染者数",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            borderColor: "#f57c00",
            borderWidth: 1,
            data: this.getPrefectureCount
          }
        ]
      };
    }
  },
  name: "PrefectureGraph",
  extends: Bar,
  mounted() {
    this.prefectureData = this.$store.getters.getPrefectureData;
    /** 感染者数が多い順に並べ替え */
    this.prefectureData.sort(function(a, b) {
      if (a.count < b.count) {
        return 1;
      } else {
        return -1;
      }
    });
    /** その他と不明を最後尾に移動 */
    var others = this.prefectureData.find(item => item.name === "その他");
    var indexOfOthers = this.prefectureData.findIndex(
      item => item.name === "その他"
    );
    this.prefectureData.splice(indexOfOthers, 1);
    this.prefectureData.push(others);
    var unknown = this.prefectureData.find(item => item.name === "不明");
    var indexOfUnknown = this.prefectureData.findIndex(
      item => item.name === "不明"
    );
    this.prefectureData.splice(indexOfUnknown, 1);
    this.prefectureData.push(unknown);
    this.setChartData();
    this.renderChart(this.chartData, this.options);
  }
};
</script>
<style scoped></style>
