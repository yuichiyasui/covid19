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
    getDate: function() {
      var dateArray = [];
      this.date.forEach((element) => {
        dateArray.push(this.$store.getters.dateToString(element.date));
      });
      return dateArray;
    },
    getCount: function() {
      var countArray = [];
      this.date.forEach((element) => {
        countArray.push(element.dischargeCount);
      });
      return countArray;
    },
  },
  mounted() {
    this.date = this.$store.getters.getDailyChangeData;
    this.renderChart(
      {
        labels: this.getDate,
        datasets: [
          {
            label: "退院者数",
            data: this.getCount,
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
