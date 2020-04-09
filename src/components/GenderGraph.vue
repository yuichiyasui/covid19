<script>
// ここでこのコンポーネントで使用するグラフの種類を定義する。今回はドーナツグラフなのでDoughnutとなる。
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  data() {
    return {
      genderData: [],
      // options: {
      //   responsive: true,
      //   legend: {
      //     position: "bottom", // 配置の設定
      //     labels: {
      //       fontSize: 28
      //     }
      //   }
      // }
    };
  },
  computed: {
    getGenderData: function() {
      return this.$store.getters.getGenderData;
    },
    getGenderName: function() {
      var genderNameArray = [];
      this.genderData.forEach((element) => {
        genderNameArray.push(element.name);
      });
      return genderNameArray;
    },
    getGenderCount: function() {
      var genderCountArray = [];
      this.genderData.forEach((element) => {
        genderCountArray.push(element.count);
      });
      return genderCountArray;
    },
  },
  mounted() {
    this.genderData = this.getGenderData;
    this.renderChart(
      {
        labels: this.getGenderName,
        // 表示するデータ
        datasets: [
          {
            data: this.getGenderCount,
            backgroundColor: ["#1e90ff", "#db7093", "#F57C00"],
            borderColor: "transparent", // 線の色を透明可
          },
        ],
      },
      { responsive: true, display: true, maintainAspectRatio: false }
      // this.options
    );
  },
};
</script>
