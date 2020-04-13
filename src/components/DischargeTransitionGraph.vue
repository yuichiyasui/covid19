<script>
import LineChart from "../assets/js/LineChart.js";

export default {
  name: "DischargeTransitionGraph",
  extends: LineChart,
  data() {
    return {
      data: [],
    };
  },
  computed: {
    //日付の箱を取得
    getDate: function(){
      const dateArray = this.$store.getters.getDischargeTransition.map((item) =>
        item.date.toLocaleDateString()
      );
      return dateArray;
    },
      //日別の退院数
    getNumber: function () {
      const dischargeArray = this.$store.getters.getDischargeTransition.map(
        (item) => item.discharge
      );
      return dischargeArray;
    },

    // countDischargeNum: function() {
    //   //storeからcsvデータを取得
    //   var masterDate = this.$store.state.masterData;
    //   // 日別毎の集計をするためのMapを宣言
    //   var dischargeOfDayMap = new Map();
    //   // 各レコードを保持する容器を宣言
    //   var entities = [];
    //   for (let i = 0; i < masterDate.length; i++) {
    //     // 各レコードを取得
    //     entities = masterDate[i];
    //     var result = JSON.stringify(entities);
    //     var results = JSON.parse(result);
    //     // レコードから確定日を取得
    //     var confirmDay = results.date;
    //     // レコードからステータスを取得
    //     var discharge = results.discharge;
    //     if (discharge && discharge != 0) {
    //       console.log(discharge);
    //       console.log(confirmDay);
    //       this.dischargeOfDayMap.set(confirmDay, discharge);
    //     }
    //   }
    //   return dischargeOfDayMap;
    // },
    // getConfirmDate: function() {
    //   var dischargeConfirmDate = [];
    //   var entities = [];
    //   for (let i = 0; i < this.data.length; i++) {
    //     // 各レコードを取得
    //     entities = this.data[i];
    //     // レコードから確定日を取得
    //     // レコードからステータスを取得
    //     var confirmDay = entities.date;
    //     var discharge = entities.discharge;
    //     if (discharge && discharge != 0) {
    //       dischargeConfirmDate.push(
    //         this.$store.getters.dateToString(confirmDay)
    //       );
    //     }
    //   }
    //   return dischargeConfirmDate;
    // },
    // getNumber: function() {
    //   var dischargeNumber = [];
    //   var entities = [];
    //   for (let i = 0; i < this.data.length; i++) {
    //     // 各レコードを取得
    //     entities = this.data[i];
    //     // レコードから確定日を取得
    //     // レコードからステータスを取得
    //     var discharge = entities.discharge;
    //     if (discharge && discharge != 0) {
    //       dischargeNumber.push(discharge);
    //     }
    //   }
    //   return dischargeNumber;
    // },
  },
  mounted() {
    this.date = this.$store.getters.getDischargeTransition;
    this.renderChart(
      {
        labels: this.getDate,
        datasets: [
          {
            label: "退院者数",
            data: this.getNumber,
            borderColor: "#f57c00",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            radius: 3,
          },
        ],
      },
      { responsive: true, display: true, maintainAspectRatio: false }
    );
  },
};
</script>
