<script>
import { Line, mixins } from "vue-chartjs";

export default {
  name: "DischargeTransitionGraph",
  extends: Line,
  mixins: [mixins.reactiveData],
  props: ["dischargeChartData", "options", "selected"],
  watch:{
    selected:function(){
     this.renderChart(this.dischargeChartData, this.options);
    }
  },
  mounted() {
    this.date = this.$store.getters.getDailyChangeData;
    this.renderChart(this.dischargeChartData, this.options);
  }
};
</script>
