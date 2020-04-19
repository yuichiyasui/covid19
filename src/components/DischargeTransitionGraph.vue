<script>
import LineChart from "../assets/js/LineChart.js";

export default {
  name: "DischargeTransitionGraph",
  extends: LineChart,
  data() {
    return {
      data: []
    };
  },
  computed: {
    //日付の箱を取得
    getDate: function() {
      const dateArray = this.data.map(item => item.date.toLocaleDateString());
      return dateArray;
    },
    //日別の退院数
    getNumber: function() {
      const dischargeArray = this.data.map(item => item.todayDischarge);
      return dischargeArray;
    }
  },
  mounted() {
    this.data = this.$store.getters.getDischargeDates;
    this.renderChart(
      {
        labels: this.getDate,
        datasets: [
          {
            label: "退院者数",
            data: this.getNumber,
            borderColor: "#f57c00",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            radius: 3
          }
        ]
      },
      { responsive: true, display: true, maintainAspectRatio: false }
    );
  }
};
</script>
