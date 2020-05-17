<template>
  <v-card outlined class="pa-3 mb-4">
    <v-card-text class="pa-0">
      <v-card-title class="title-color">年代別感染者グラフ</v-card-title>
      <div style="width:100%" class="mx-auto">
        <age-graph :chart-data="ageChartData" :options="options" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import AgeGraph from "@/components/age/AgeGraph.vue";
import AGE_ARRAY from "@/assets/js/age.js";
export default {
  components: {
    AgeGraph,
  },
  data() {
    return {
      ageChartData: {
        labels: AGE_ARRAY,
        datasets: [
          {
            label: "感染者数",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            borderColor: "#f57c00",
            borderWidth: 1,
            data: [],
          },
        ],
      },
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
                // max: 1500, //最大値
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
    };
  },
  methods: {
    /**
     * 年代別グラフで使ってる
     */
    setAgeData() {
      var ageArray = AGE_ARRAY;
      var resultArray = [];
      var masterData = this.$store.state.masterData;
      for (let i = 0; i < ageArray.length; i++) {
        var age = { id: i, name: ageArray[i], count: 0 };
        resultArray.push(age);
      }
      for (let j = 0; j < masterData.length; j++) {
        var ageData = masterData[j].age;
        var isMatch = false; // マッチしてなかったらfalse
        for (let i = 0; i < ageArray.length; i++) {
          if (ageData == Number(resultArray[i].name)) {
            resultArray[i].count++;
            isMatch = true; // マッチしたらtrue
            break;
          }
          // "1-10,不明"
          if (isMatch === false) {
            if (ageData == resultArray[i].name) {
              resultArray[i].count++;
              break;
            }
          }
        }
      }
      this.ageChartData.datasets[0].data = resultArray.map((elm) => elm.count);
    },
  },
  created() {
    this.setAgeData();
  },
};
</script>
