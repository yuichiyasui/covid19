<script>
import { Line, mixins } from "vue-chartjs";

export default {
  name: "IndividualPrefectureGraph",
  extends: Line,
  mixins: [mixins.reactiveData],
  props: ["prefChartData", "options"],
  mounted() {
    if(this.prefChartData){
      this.renderChart(this.prefChartData, this.options);
    }
  }
};
</script>
