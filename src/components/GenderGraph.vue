<script>
// ここでこのコンポーネントで使用するグラフの種類を定義する。今回はドーナツグラフなのでDoughnutとなる。
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  data() {
    return {
      datas: {
        // 凡例とツールチップに表示するラベル
        labels: ["男性", "女性", "不明"],
        // 表示するデータ
        datasets: [
          {
            data: [40, 40, 10],
            backgroundColor: ["#1e90ff", "#db7093", "#f5deb3"],
            borderColor: "transparent" // 線の色を透明可
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          position: "bottom", // 配置の設定
          labels: {
            fontSize: 28
          }
        }
      }
    };
  },
  mounted() {
    this.renderChart(this.datas, this.options);
  }
};
</script>
