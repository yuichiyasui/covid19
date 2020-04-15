<script>
import LineChart from "../assets/js/LineChart.js";

export default {
  name: "GenderGraphByDay",
  extends: LineChart,
  data() {
    return {
      date: []
    };
  },
  computed: {
    //日付
    getDate: function() {
      var dateArray = [];
      this.date.forEach(element => {
        dateArray.push(this.$store.getters.dateToString(element.date));
      });
      return dateArray;
    },
    //日別の感染者数
    getCount: function() {
      var countArray = [];
      this.date.forEach(element => {
        countArray.push(element.count);
      });
      return countArray;
    }
  },
  //mountのタイミング
  mounted() {
    this.date = this.$store.getters.getDates;
    this.renderChart(
      {
        labels: this.getDate,
        datasets: [
          {
            label: "感染者数",
            data: this.getCount,
            borderColor: "#f57c00",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            radius: 3
          }
        ]
      },
      { responsive: true, display: true, maintainAspectRatio: false }
    );
  },
  methods: {}
};
</script>

getGenderDates(state) { var masterData = state.masterData; var dateArray = [];
// 日別感染者数の集計結果を格納する配列 /**
日付とカウンターをプロパティにした日付オブジェクトを2020年1月1日から今日の分まで生成して配列に格納
*/ var preToday = new Date(); var today = new Date( preToday.getFullYear(),
preToday.getMonth(), preToday.getDate(), 0, 0 ); var startDate = new Date(2020,
0, 1, 0, 0); var ms = today.getTime() - startDate.getTime(); var endCount = ms /
(1000 * 60 * 60 * 24) + 1; for (let i = 1; i <= endCount; i++) { var date = new
Date(2020, 0, i); var dateObj = { date: date, count: 0 };
dateArray.push(dateObj); } /** マスターデータを1行ずつみていく */ for (let i =
0; i < masterData.length; i++) { /**
マスターデータの日付が日付オブジェクトのいずれかの日付とマッチするかみていく(絶対にどこかでマッチする)
*/ try { for (let j = 0; dateArray.length; j++) { /**
もしマッチしたらその日付のカウンターにプラス1してfor文を終了(マッチしない場合はスルーして次の日付へ)
*/ if ((masterData[i].date.getTime() ===
dateArray[j].date.getTime())&&(masterData[i].gender==="1-10")) {
dateArray[j].count++; break; } } } catch (error) { console.error(error.name + ":
" + error.message + "[this date: "+ masterData[i].date + "]") break; } }} return
dateArray; },
