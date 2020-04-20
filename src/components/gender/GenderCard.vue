<template>
  <v-card outlined class="pa-3 mb-4">
    <v-card-text class="pa-0">
      <v-card-title class="title-color">男女別感染者数</v-card-title>
      <v-row class="text-center" justify="center">
        <v-col>
          <v-icon class="pb-2" style="color:#3407fa;">
            mdi-human-male
          </v-icon>
          <span class="headline font-weight-bold">
            {{ genderData[0].count.toLocaleString() }}
          </span>
          人
        </v-col>
        <v-col>
          <v-icon class="pb-2" style="color:#fc0331;">
            mdi-human-female
          </v-icon>
          <span class="headline font-weight-bold">
            {{ genderData[1].count.toLocaleString() }}
          </span>
          人
        </v-col>
        <v-col>
          <v-icon class="pb-2" style="color:#f57c00">
            mdi-human-male-female
          </v-icon>
          <span class="headline font-weight-bold">
            {{ genderData[2].count.toLocaleString() }}
          </span>
          人
        </v-col>
      </v-row>
      <div style="width:80%" class="mx-auto">
        <gender-graph :gender-chart-data="chartData" :options="options" />
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import GenderGraph from "@/components/gender/GenderGraph.vue";
export default {
  components: {
    GenderGraph
  },
  data() {
    return {
      genderData: [],
      chartData: {
        labels: ["男性", "女性", "不明"],
        datasets: [
          {
            data: [20, 30, 40],
            backgroundColor: [
              "rgba(7, 12, 250, 0.2)",
              "rgba(400, 5, 3, 0.2)",
              "rgba(255, 130, 3, 0.2)"
            ],
            borderColor: ["#3407fa", "#fc0331", "#f57c00"],
            borderWidth: 1,
            datalabels: {
              // ここにchartjs-data-labelsのオプションを定義
              font: {
                size: "20"
              }
            }
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        plugins: {
          // ここにchartjs-data-labelsのオプションを定義
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return (
                data.labels[tooltipItem.index] +
                ": " +
                data.datasets[0].data[tooltipItem.index] +
                " %"
              ); // 単位を付ける
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
      const reducer = (sum, currentValue) => sum + currentValue;
      var sum = resultArray.map(elm => elm.count).reduce(reducer);
      this.chartData.datasets[0].data = resultArray
        .map(elm => elm.count)
        .map(elm => Math.round((elm / sum) * 100));
    }
  },
  created() {
    this.setGenderData();
  }
};
</script>
