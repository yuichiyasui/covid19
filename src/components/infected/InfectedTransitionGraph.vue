<script>
import { Line, mixins } from "vue-chartjs";

export default {
  name: "TransitionGraph",
  extends: Line,
  mixins: [mixins.reactiveData],
  props: ["infectedChartData", "options", "selected"],
  watch:{
    selected:function(){
      this.renderChart(this.infectedChartData, this.options);
    }
  },
  mounted() {
    this.renderChart(this.infectedChartData, this.options);
  },
  methods: {}
};
</script>
