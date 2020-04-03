<template>
  <div>
    <h1>男女別感染者数</h1>
  </div>
</template>

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
            data: [10, 15, 6],
            backgroundColor: ["#1e90ff", "#db7093", "#db7093"],
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
        },
        tooltips: {
          bodyFontSize: 28,
          callbacks: {
            label: function(tooltipItem, data) {
              let total = 0; // 合計格納
              let indexItem = data.datasets[0].data[tooltipItem.index]; // マウスを当てたデータ
              // 全データの合計算出
              data.datasets[0].data.forEach(item => {
                total += item;
              });
              // パーセント表示
              return Math.round((indexItem / total) * 100) + " %";
            }
          }
        }
      }
    };
  },
  mounted() {
    this.addPlugin({
      afterDraw(chart) {
        let ctx = chart.ctx;
        chart.data.datasets.forEach((dataset, i) => {
          let dataSum = 0;
          dataset.data.forEach(element => {
            dataSum += element;
          });

          let meta = chart.getDatasetMeta(i);
          if (!meta.hidden) {
            meta.data.forEach(function(element, index) {
              // フォントの設定
              let fontSize = 28;
              let fontStyle = "normal";
              let fontFamily = "Helvetica Neue";
              ctx.fillStyle = "#000";

              // 設定を適用
              ctx.font = chart.helpers.fontString(
                fontSize,
                fontStyle,
                fontFamily
              );

              // ラベルをパーセント表示に変更
              let labelString = `${chart.data.labels[index]}: ${dataset.data[index]}`;
              let dataString =
                Math.round((dataset.data[index] / dataSum) * 100).toString() +
                "%";

              // positionの設定
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";

              let padding = -2;
              let position = element.tooltipPosition();
              // ツールチップに変更内容を表示
              ctx.fillText(
                labelString,
                position.x,
                position.y - fontSize / 2 - padding
              ); // title
              ctx.fillText(
                dataString,
                position.x,
                position.y + fontSize / 2 - padding
              ); // データの百分率

              // 凡例の位置調整
              let legend = chart.legend;
              legend.top = chart.height - legend.height / 2 - legend.top / 2;
            });

            // 中央にテキスト表示
            let fontSize = 70;
            let fontStyle = "normal";
            let fontFamily = "Helvetica Neue";
            ctx.fillStyle = "#000";
            ctx.font = chart.helpers.fontString(
              fontSize,
              fontStyle,
              fontFamily
            );

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // position(第二, 第三引数は適宜調整)
            ctx.fillText(
              "男女別感染者数",
              chart.width / 2 - 60,
              chart.height / 2
            );
          }
        });
      }
    });
    this.renderChart(this.datas, this.options);
  }
};
</script>
