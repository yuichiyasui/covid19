<script>
import { Line, mixins } from "vue-chartjs";

export default {
  name: "TransitionDead",
  extends: Line,
  mixins: [mixins.reactiveData],
  props: ["deadChartData", "options", "selected"],
  watch: {
    selected: function() {
      this.renderChart(this.deadChartData, this.options);
    }
  },
  mounted() {
    this.renderChart(this.deadChartData, this.options);
  }
};
</script>
