<script>
import { Line, mixins } from "vue-chartjs";

export default {
  name: "AgeDayGraph",
  extends: Line,
  mixins: [mixins.reactiveData],
  data() {
    return {
      ageByDayChartData: [],
      options: { responsive: true, display: true, maintainAspectRatio: false },
    };
  },
  methods: {
    setChartData() {
      var ageByDay = this.$store.getters.getAgeDay;
      var labels = ageByDay[0].dateArray.map((item) =>
        this.$store.getters.dateToString(item.date)
      );
      this.ageByDayChartData = {
        labels: labels,
        datasets: [
          {
            label: ageByDay[0].name + "代",
            data: ageByDay[0].dateArray.map((date) => date.count),
            borderColor: "#f57c00",
            backgroundColor: "rgba(0,0,0,0)",
            radius: 1,
            borderWidth: 1,
          },
          {
            label: ageByDay[1].name + "代",
            data: ageByDay[1].dateArray.map((date) => date.count),
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#356e4d",
            radius: 1,
            borderWidth: 1,
          },
          {
            label: ageByDay[2].name + "代",
            data: ageByDay[2].dateArray.map((date) => date.count),
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#e6f029",
            radius: 1,
            borderWidth: 1,
          },
          {
            label: ageByDay[3].name + "代",
            data: ageByDay[3].dateArray.map((date) => date.count),
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#fa5546",
            radius: 1,
            borderWidth: 1,
          },
          {
            label: ageByDay[4].name + "代",
            data: ageByDay[4].dateArray.map((date) => date.count),
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#2521ff",
            radius: 1,
            borderWidth: 1,
          },
          {
            label: ageByDay[5].name + "代",
            data: ageByDay[5].dateArray.map((date) => date.count),
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#fc32d4",
            radius: 1,
            borderWidth: 1,
          },
          {
            label: ageByDay[6].name + "代",
            data: ageByDay[6].dateArray.map((date) => date.count),
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#0aecfc",
            radius: 1,
            borderWidth: 1,
          },
          {
            label: ageByDay[7].name + "代",
            data: ageByDay[7].dateArray.map((date) => date.count),
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#4f10ad",
            radius: 1,
            borderWidth: 1,
          },
          {
            label: ageByDay[8].name + "代",
            data: ageByDay[8].dateArray.map((date) => date.count),
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#6ffc0a",
            radius: 1,
            borderWidth: 1,
          },
          {
            label: ageByDay[9].name + "代",
            data: ageByDay[9].dateArray.map((date) => date.count),
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#f79ed7",
            radius: 1,
            borderWidth: 1,
          },
          {
            label: ageByDay[10].name + "",
            data: ageByDay[10].dateArray.map((date) => date.count),
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#c4c0c0",
            radius: 1,
            borderWidth: 1,
          },
        ],
      };
    },
  },
  mounted() {
    this.setChartData();
    this.renderChart(this.ageByDayChartData, this.options);
  },
};
</script>
