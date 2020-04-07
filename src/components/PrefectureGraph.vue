<script>
// import { HorizontalBar } from "vue-chartjs";
import { Bar } from "vue-chartjs";

export default {
  data() {
    return {
      prefectureData: []
    };
  },
  computed: {
    getPrefectureData: function() {
      return this.$store.getters.getPrefectureData;
    },
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
            backgroundColor: "#7979f8",
            data: this.getPrefectureCount
          }
        ]
      },
      { responsive: true, display: true, maintainAspectRatio: false }
    );
  }
};
</script>
<style scoped></style>
