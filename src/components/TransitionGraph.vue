<script>
import LineChart from "../assets/js/LineChart.js";

export default {
  name: "TransitionGraph",
  extends: LineChart,
  data() {
    return {
      date: [],
    };
  },
  //method
  computed: {
    //日付
    getDate: function() {
      var dateArray = [];
      this.date.forEach((element) => {
        dateArray.push(this.$store.getters.dateToString(element.date));
      });
      return dateArray;
    },
    //日別の感染者数
    getCount: function() {
      var countArray = [];
      this.date.forEach((element) => {
        countArray.push(element.count);
      });
      return countArray;
    },
  },
  //mountのタイミング
  mounted() {
    this.date = this.$store.getters.getDates;
    this.renderChart(
      {
        labels: this.getDate,
        datasets: [
          {
            label: "感染者数",
            data: this.getCount,
            borderColor: "#f57c00",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            radius: 3,
          },
        ],
      },
      { responsive: true, display: true, maintainAspectRatio: false }
    );
  },
  methods: {},
};
</script>
