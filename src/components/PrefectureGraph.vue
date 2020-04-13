<script>
import { HorizontalBar } from "vue-chartjs";
// import { Bar } from "vue-chartjs";

export default {
  data() {
    return {
      prefectureData: [],
      options: { responsive: true, display: true, maintainAspectRatio: false }
    };
  },
  computed: {
    getPrefectureName: function() {
      var prefectureNameArray = [];
      this.prefectureData.forEach(element => {
        prefectureNameArray.push(element.name);
      });
      return prefectureNameArray;
    },
    getPrefectureCount: function() {
      var prefectureCountArray = [];
      this.prefectureData.forEach(element => {
        prefectureCountArray.push(element.count);
      });
      return prefectureCountArray;
    }
  },
  methods: {
    setChartData() {
      this.chartData = {
        labels: this.getPrefectureName,
        datasets: [
          {
            label: "感染者数",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            borderColor: "#f57c00",
            borderWidth: 1,
            data: this.getPrefectureCount
          }
        ]
      };
    }
  },
  name: "PrefectureGraph",
  extends: HorizontalBar,
  // extends: Bar,
  mounted() {
    this.prefectureData = this.$store.getters.getPrefectureData;
    this.setChartData();
    this.renderChart(this.chartData, this.options);
  },
  updated(){
    console.info("beforeUpdate!!!!")
    this.prefectureData = this.$store.getters.getPrefectureData;
    this.setChartData();
    this.renderChart(this.chartData, this.options);
  }
};
</script>
<style scoped></style>
