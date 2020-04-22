<script>
import { Line, mixins } from "vue-chartjs";

export default {
  name: "PcrTransitionGraph",
  extends: Line,
  mixins: [mixins.reactiveData],
  props: ["pcrChartData", "options", "selected"],
  watch: {
    selected: function() {
      this.renderChart(this.pcrChartData, this.options);
    }
  },
  mounted() {
    this.renderChart(this.pcrChartData, this.options);
  }
};
</script>
