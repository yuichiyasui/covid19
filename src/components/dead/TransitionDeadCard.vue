<template>
  <v-card outlined class="pa-3 mb-4">
    <v-card-text class="pa-0">
      <v-card-title class="title-color">死亡者数推移</v-card-title>
      <v-row align="center" justify="center">
        <v-btn-toggle
          v-model="toggle_exclusive"
          mandatory
          class="ml-auto mr-5"
          dense
        >
          <v-btn :disabled="byDayButton" @click="switchGraph()">
            日別
          </v-btn>
          <v-btn :disabled="totalButton" @click="switchGraph()">
            累計
          </v-btn>
        </v-btn-toggle>
      </v-row>
      <TransitionDead :dead-chart-data="deadChartData" :options="options" :selected="selected" />
      <div class="pa-2 overline">
        ※ 上記データは最初に事例が確認された日を起点にしています
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import TransitionDead from "@/components/dead/TransitionDead";
export default {
  components: {
    TransitionDead
  },
  data() {
    return {
      toggle_exclusive: undefined,
      byDayButton: true, // ボタンのdisabled
      totalButton: false, // ボタンのdisabled
      selected: "日別",
      deadChartData: {
        labels: ["4/1", "4/2", "4/3"],
        datasets: [
          {
            label: "死亡者数",
            data: [10, 20, 30],
            borderColor: "#f57c00",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            radius: 0,
            hitRadius: 2, // マウスポインタ検出のための円の半径
            borderWidth: 1, // 線の太さ
            tension: 0 // 曲線の滑らかさ
          }
        ]
      },
      options: { responsive: true, display: true, maintainAspectRatio: false }
    };
  },
  methods: {
    setDeadDataByTotal() {
      var masterData = this.$store.state.masterData;
      var deadData = masterData.filter(elm => elm.dead !== ""); // 死者合計の入った行だけ切り出し
      var resultArray = deadData.map(function(elm) {
        // 行から日付と死者合計だけを詰めたオブジェクトだけの配列に変換
        return { date: elm.date, count: elm.dead };
      });
      return resultArray;
    },
    setDeadDataByDay() {
      var masterData = this.$store.state.masterData;
      var deadData = masterData.filter(elm => elm.dead !== ""); // 死者合計の入った行だけ切り出し
      deadData = deadData.map(function(elm) {
        // 行から日付と死者合計だけを詰めたオブジェクトだけの配列に変換
        return { date: elm.date, dead: elm.dead };
      });
      var resultArray = [];
      for (let i = 0; i < deadData.length; i++) {
        if (i === 0) {
          // 1回目は比較する前日がないためそのままpush
          let result = {
            date: deadData[i].date,
            count: Number(deadData[i].dead)
          };
          resultArray.push(result); // 文字列になって格納されるためNumberで数値型に変換
        } else {
          if (deadData[i].dead === deadData[i - 1].dead) {
            // 当日と前日が同じ場合0をpush
            let result = {
              date: deadData[i].date,
              count: 0
            };
            resultArray.push(result);
          } else {
            // 前日より死者数が増加していれば、差分をpush
            let result = {
              date: deadData[i].date,
              count: deadData[i].dead - deadData[i - 1].dead
            };
            resultArray.push(result);
          }
        }
      }
      return resultArray;
    },
    setChartData(deadDataArray) {
      this.deadChartData.labels = deadDataArray.map(elm =>
        this.$store.getters.dateToString(elm.date)
      );
      this.deadChartData.datasets[0].data = deadDataArray.map(elm => elm.count);
    },
    switchGraph() {
      if (this.byDayButton === true) {
        // 累計ボタンが押された時
        this.setChartData(this.setDeadDataByTotal());
        this.selected = "累計"
        this.byDayButton = false;
        this.totalButton = true;
      } else {
        // 日別ボタンが押された時
        this.setChartData(this.setDeadDataByDay());
        this.selected = "日別"
        this.byDayButton = true;
        this.totalButton = false;
      }
    }
  },
  created() {
    var deadDataArray = this.setDeadDataByDay();
    this.setChartData(deadDataArray);
  }
};
</script>
