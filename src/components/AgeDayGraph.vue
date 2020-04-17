<script>
import { Line } from "vue-chartjs";

export default {
  name: "AgeDayGraph",
  extends: Line,
  data() {
    return {
      date: [],
    };
  },
  computed: {
    //日付
    getDate: function() {
      var dateArray = [];
      this.$store.getters.getDates.forEach((element) => {
        dateArray.push(this.$store.getters.dateToString(element.date));
      });
      return dateArray;
    },
    //年代別の名前
    getAgeName: function() {
      var ageNameArray = [];
      this.AgeByDay.forEach((element) => {
        ageNameArray.push(element.name);
      });
      return ageNameArray;
    },
    //日別の感染者数
    getCount: function() {
      var countArray = [];
      this.AgeDaydate.forEach((element) => {
        element.dateArray.forEach((element) => {
          countArray.push(element.count);
        });
      });
      return countArray;
    },
  },
  //mountのタイミング
  mounted() {
    var ageByDay = this.$store.getters.getAgeDay;
    console.log(ageByDay);
    console.log(ageByDay[0]);
    console.log(ageByDay[1]);
    this.renderChart(
      {
        labels: this.getDate,
        datasets: [
          {
            label: ageByDay[1].name,
            data: this.AgeByDay[0].dateArray.map((date) => date.count),
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
