<script>
import { Bar, mixins } from "vue-chartjs";

export default {
  extends: Bar,
  props: ["ageChartData", "options"],
  mixins: [mixins.reactiveProp],
  mounted() {
    this.renderChart(this.ageChartData, this.options);
  },
};
</script>
