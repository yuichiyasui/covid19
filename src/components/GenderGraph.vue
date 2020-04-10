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
            backgroundColor: [
              "rgba(7, 12, 250, 0.2)",
              "rgba(400, 5, 3, 0.2)",
              "rgba(255, 130, 3, 0.2)",
            ],
            borderColor: ["#3407fa", "#fc0331", "#f57c00"],
            borderWidth: 1,
          },
        ],
      },
      { responsive: true, display: true, maintainAspectRatio: false }
      // this.options
    );
  },
};
</script>
