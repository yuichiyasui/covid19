<script>
import { Bar,mixins } from "vue-chartjs";

export default {
  name: "PrefectureGraph",
  extends: Bar,
  mixins: [mixins.reactiveData],
  props: ["prefChartData", "options"],
  mounted() {
    this.renderChart(this.prefChartData, this.options);
  }
};
</script>
