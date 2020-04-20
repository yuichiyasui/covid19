<script>
// ここでこのコンポーネントで使用するグラフの種類を定義する。今回はドーナツグラフなのでDoughnutとなる。
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  data() {
    return {
      genderData: [],
      chartData: {
        labels: ["男性", "女性", "不明"],
        // 表示するデータ
        datasets: [
          {
            data: [44, 51, 5],
            backgroundColor: [
              "rgba(7, 12, 250, 0.2)",
              "rgba(400, 5, 3, 0.2)",
              "rgba(255, 130, 3, 0.2)"
            ],
            borderColor: ["#3407fa", "#fc0331", "#f57c00"],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        tooltips: {
          bodyFontSize: 18,
          callbacks: {
            label: function(tooltipItem, data) {
              let total = 0; // 合計格納
              let indexItem = data.datasets[0].data[tooltipItem.index]; // マウスを当てたデータ
              // 全データの合計算出
              data.datasets[0].data.forEach(item => {
                total += item;
              });
              //         // パーセント表示
              return Math.round((indexItem / total) * 100) + "%";
            }
          }
        }
      }
    };
  },
  methods: {
    setGenderData() {
      var genderArray = ["男性", "女性", "不明"];
      var resultArray = [];
      var masterData = this.$store.state.masterData;
      for (let i = 0; i < genderArray.length; i++) {
        var gender = { id: i, name: genderArray[i], count: 0 };
        resultArray.push(gender);
      }
      for (let j = 0; j < masterData.length; j++) {
        var genderData = masterData[j].gender;
        if (genderData === "男児") {
          /** 男児だった場合は男性に変換 */
          genderData = "男性";
        }
        var isMatch = false; // マッチしてなかったらfalse
        for (let k = 0; k < genderArray.length; k++) {
          if (genderData === resultArray[k].name) {
            resultArray[k].count++;
            isMatch = true; // マッチしたらtrue
            break;
          }
        }
        if (isMatch === false) {
          // いずれにもマッチしなかった場合不明に追加
          resultArray[3].count++;
        }
      }
      this.genderData = resultArray;
      this.chartData.datasets.data = resultArray.map(elm => elm.count);
    }
  },
  mounted() {
    this.setGenderData();
    this.renderChart(this.chartData, this.options);
  }
};
</script>
