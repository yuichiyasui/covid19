<script>
import { Line, mixins } from "vue-chartjs";

export default {
  name: "TransitionDead",
  extends: Line,
  mixins: [mixins.reactiveData],
  props: ["deadChartData", "options"],
  mounted() {
    this.renderChart(this.deadChartData, this.options);
  }
};
</script>
