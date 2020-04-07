<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  name: "chart",
  data() {
    return {
      data: {
        labels: [
          "10歳未満",
          "10代",
          "20代",
          "30代",
          "40代",
          "50代",
          "60代",
          "70代",
          "80代以上"
        ],
        datasets: [
          {
            label: "感染者数",
            data: [10, 20, 30, 40, 50, 30, 60, 40, 50],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(10, 200, 64, 0.2)",
              "rgba(55, 80, 200, 0.2)",
              "rgba(122, 122, 122, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(10, 200, 64, 1)",
              "rgba(55, 80, 200, 1)",
              "rgba(122, 122, 122, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "年代"
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 10
              }
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.renderChart(this.data, this.options);
  }
};
</script>
