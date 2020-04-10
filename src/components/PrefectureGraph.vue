<script>
// import { HorizontalBar } from "vue-chartjs";
import { Bar } from "vue-chartjs";

export default {
  data() {
    return {
      prefectureData: [],
    };
  },
  computed: {
    getPrefectureData: function() {
      return this.$store.getters.getPrefectureData;
    },
    getPrefectureName: function() {
      var prefectureNameArray = [];
      this.prefectureData.forEach((element) => {
        prefectureNameArray.push(element.name);
      });
      return prefectureNameArray;
    },
    getPrefectureCount: function() {
      var prefectureCountArray = [];
      this.prefectureData.forEach((element) => {
        prefectureCountArray.push(element.count);
      });
      return prefectureCountArray;
    },
  },
  name: "PrefectureGraph",
  // extends: HorizontalBar,
  extends: Bar,
  mounted() {
    this.prefectureData = this.getPrefectureData;
    this.renderChart(
      {
        labels: this.getPrefectureName,
        datasets: [
          {
            label: "感染者数",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            borderColor: "#f57c00",
            borderWidth: 1,
            data: this.getPrefectureCount,
          },
        ],
      },
      { responsive: true, display: true, maintainAspectRatio: false }
    );
  },
};
</script>
<style scoped></style>
