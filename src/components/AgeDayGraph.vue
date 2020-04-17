<script>
import LineChart from "../assets/js/LineChart.js";

export default {
  name: "AgeDayGraph",
  extends: LineChart,
  data() {
    return {
      date: []
    };
  },
  computed: {
    //日付
    getDate: function() {
      var dateArrays = [];
      this.AgeByDay.forEach(element => {
        dateArrays.push(element.dateArray.date.toLocaleDateString());
      });
      return dateArrays;
    },
    //年代別の名前
    getAgeName: function() {
      var ageNameArray = [];
      this.AgeByDay.forEach(element => {
        ageNameArray.push(element.name);
      });
      return ageNameArray;
    },
    //日別の感染者数
    getCount: function() {
      var countArray = [];
      this.AgeDaydate.forEach(element => {
        countArray.push(element.dateArray.count);
      });
      return countArray;
    }
  },
  //mountのタイミング
  mounted() {
    this.AgeByDay = this.$store.getters.getAgeDay;
    this.renderChart(
      {
        labels: this.getDate,
        datasets: [
          {
            label: this.getAgeName,
            data: this.getCount,
            borderColor: "#f57c00",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            radius: 3
          }
        ]
      },
      { responsive: true, display: true, maintainAspectRatio: false }
    );
  },
  methods: {}
};
</script>
