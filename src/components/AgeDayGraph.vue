<script>
import { Line, mixins } from "vue-chartjs";

export default {
  name: "AgeDayGraph",
  extends: Line,
  mixins: [mixins.reactiveData],
  data() {
    return {
      ageByDayChartData: [],
      options: { responsive: true, display: true, maintainAspectRatio: false },
    };
  },
  methods: {
    setChartData() {
      var ageByDay = this.$store.getters.getAgeDay;
      var labels = ageByDay[1].dateArray.map((item) =>
        this.$store.getters.dateToString(item.date)
      );

      /** 検証用のカウントデータだから */
      var testDataArray = [];
      for (var i = 0; i < 108; i++) {
        testDataArray.push(i);
      }

      this.ageByDayChartData = {
        labels: labels,
        datasets: [
          {
            label: ageByDay[1].name + "代の感染者数",
            // data: ageByDay[0].dateArray.map(date => date.count),
            data: testDataArray, // 検証用データにしてるので変更してね！
            borderColor: "#f57c00",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            radius: 3,
          },
        ],
      };
    },
  },
  mounted() {
    this.setChartData();
    this.renderChart(this.ageByDayChartData, this.options);
  },
};
</script>
