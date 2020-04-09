<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  name: "AgeGraph",
  data() {
    return {
      ageData: []
    };
  },

  computed: {
    getAgeData: function() {
      return this.$store.getters.getAgeData;
    },
    getAgeName: function() {
      var ageNameArray = [];
      this.ageData.forEach(element => {
        ageNameArray.push(element.name);
      });
      return ageNameArray;
    },
    getAgeCount: function() {
      var ageCountArray = [];
      this.ageData.forEach(element => {
        ageCountArray.push(element.count);
      });
      return ageCountArray;
    }
  },
  mounted() {
    this.ageData = this.getAgeData;
    this.renderChart(
      {
        labels: this.getAgeName,
        datasets: [
          {
            label: "感染者数",
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(10, 200, 64, 0.2)",
              "rgba(55, 80, 200, 0.2)",
              "rgba(122, 122, 122, 0.2)",
              "rgba(10, 50, 122, 0.2)",
              "rgba(122, 10, 50, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(10, 200, 64, 1)",
              "rgba(55, 80, 200, 1)",
              "rgba(122, 122, 122, 1)",
              "rgba(10, 50, 122, 1)",
              "rgba(122, 10, 50, 1)"
            ],
            borderWidth: 1,

            data: this.getAgeCount
          }
        ]
      },
      // {
      //   options: {
      //     scales: {
      //       xAxes: [
      //         {
      //           scaleLabel: {
      //             display: false,
      //             labelString: "年代"
      //           }
      //         }
      //       ]
      //     }
      //   }
      // },
      {
        labelString: "年代",
        responsive: true,
        display: true,
        maintainAspectRatio: false
      }
      //this.options
    );
  }
};
</script>
