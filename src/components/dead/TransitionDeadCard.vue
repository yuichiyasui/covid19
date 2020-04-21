<template>
  <v-card outlined class="pa-3 mb-4">
    <v-card-text class="pa-0">
      <v-card-title class="title-color">死亡者数推移</v-card-title>
      <TransitionDead :dead-chart-data="deadChartData" :options="options" />
    </v-card-text>
  </v-card>
</template>
<script>
import TransitionDead from "@/components/dead/TransitionDead";
export default {
  components: {
    TransitionDead
  },
  data() {
    return {
      deadChartData: {
        labels: ["4/1", "4/2", "4/3"],
        datasets: [
          {
            label: "死亡者数",
            data: [10, 20, 30],
            borderColor: "#f57c00",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            radius: 0,
            hitRadius: 2, // マウスポインタ検出のための円の半径
            borderWidth: 1, // 線の太さ
            tension: 0 // 曲線の滑らかさ
          }
        ]
      },
      options: { responsive: true, display: true, maintainAspectRatio: false }
    };
  },
  computed: {
    //日付
    getDate: function() {
      var dateArray = [];
      this.data.forEach(element => {
        dateArray.push(this.$store.getters.dateToString(element.date));
      });
      return dateArray;
    },
    //日別の死者数
    getCount: function() {
      var countArray = [];
      this.data.forEach(element => {
        countArray.push(element.deadCount);
      });
      return countArray;
    }
  },
  methods: {
    setDeadData() {
      var data = this.$store.getters.getDailyChangeData;
      for(let i = 0; i < data.length; i++){
        if(data[i].deadCount > 0){
          data[i].deadCount = data[i].deadCount - data[i -1].deadCount;
        }
      }
      this.deadChartData.labels = data.map(elm =>
        this.$store.getters.dateToString(elm.date)
      );
      this.deadChartData.datasets[0].data = data.map(elm => elm.deadCount);
    },
  },
  created() {
    this.setDeadData();
  }
};
</script>
