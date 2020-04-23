<script>
import { Doughnut, mixins } from "vue-chartjs";

export default {
  extends: Doughnut,
  mixins: [mixins.reactiveData],
  props: ["genderChartData", "options"],
  mounted() {
      this.renderChart(this.genderChartData, this.options);
  }
};
</script>
