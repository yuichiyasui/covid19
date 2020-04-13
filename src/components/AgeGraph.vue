<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  name: "AgeGraph",
  data() {
    return {
      options: {
        responsive: true,
        display: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              //y軸設定
              display: true, //表示設定
              scaleLabel: {
                //軸ラベル設定
                display: true, //表示設定
                labelString: "感染者数", //ラベル
                fontSize: 12, //フォントサイズ
              },
              ticks: {
                //最大値最小値設定
                min: 0, //最小値
                // max: 1000, //最大値
                fontSize: 12, //フォントサイズ
                stepSize: 100, //軸間隔
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "年代",
              },
            },
          ],
        },
      },
      ageData: [],
    };
  },

  computed: {
    getAgeData: function() {
      return this.$store.getters.getAgeData;
    },
    getAgeName: function() {
      var ageNameArray = [];
      this.ageData.forEach((element) => {
        ageNameArray.push(element.name);
      });
      return ageNameArray;
    },
    getAgeCount: function() {
      var ageCountArray = [];
      this.ageData.forEach((element) => {
        ageCountArray.push(element.count);
      });
      return ageCountArray;
    },
  },
  mounted() {
    this.ageData = this.getAgeData;
    this.renderChart(
      {
        labels: this.getAgeName,
        datasets: [
          {
            label: "感染者数",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            borderColor: "#f57c00",
            borderWidth: 1,

            data: this.getAgeCount,
          },
        ],
      },
      // {
      //   options: {
      //     scales: {
      //       xAxes: [
      //         {
      //           scaleLabel: {
      //             display: false,
      //             labelString: "年代"
      //           }
      //         }
      //       ]
      //     }
      //   }
      // },
      // {
      //   responsive: true,
      //   display: true,
      //   maintainAspectRatio: false
      // }
      this.options
    );
  },
};
</script>
