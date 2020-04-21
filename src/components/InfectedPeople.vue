<template>
  <v-card-text>
    <div class="mb-7">
      <div class="subtitle-1 title-color">感染者数</div>
      <span class="font-weight-bold display-1">{{ masterData.length.toLocaleString() }} </span>人
      <div class="body-2">本日：+ {{ todayInfectedCount.toLocaleString() }} 人</div>
      <div class="body-2">昨日：+ {{ yesterdayInfectedCount.toLocaleString() }} 人</div>
    </div>
    <div class="mb-7">
      <div class="subtitle-1 title-color">回復者数</div>
      <span class="font-weight-bold display-1">{{ totalDischarge.toLocaleString() }} </span>人
      <div class="body-2">
        本日：+ {{ todayDischarge.toLocaleString() }} 人
      </div>
      <div class="body-2">
        昨日：+ {{ yesterdayDischarge.toLocaleString() }} 人
      </div>
    </div>
    <div>
      <div class="subtitle-1 title-color">死亡者数</div>
      <span class="font-weight-bold display-1">{{ totalDead.toLocaleString() }} </span>人
      <div class="body-2">
        本日：+ {{ todayDead.toLocaleString() }} 人
      </div>
      <div class="body-2">
        昨日：+ {{ yesterdayDead.toLocaleString() }} 人
      </div>
    </div>
  </v-card-text>
</template>

<script>
export default {
  data() {
    return {
      masterData: this.$store.state.masterData,
      dailyChangeData: this.$store.getters.getDailyChangeData,

      todayInfectedCount: "集計中",
      yesterdayInfectedCount: "集計中",
      totalDead: "集計中",
      todayDead: "集計中",
      yesterdayDead: "集計中",
      totalDischarge: "集計中",
      todayDischarge: "集計中",
      yesterdayDischarge: "集計中",
    };
  },
  computed: {
    getDailyChangeData: function() {
      var dailyChangeData = this.dailyChangeData;
      // console.log("前" + dailyChangeData);
      // for(let i = 0; i < dailyChangeData.length; i++){
      //   if(dailyChangeData[i].deadCount > 0){
      //     dailyChangeData[i].deadCount = dailyChangeData[i].deadCount - dailyChangeData[i -1].deadCount;
      //   }
      // }
      // console.log(dailyChangeData);
      return dailyChangeData;
    },
  },

  mounted() {
    this.todayInfectedCount = 
      this.getDailyChangeData[this.getDailyChangeData.length - 1].infectedCount;
    this.yesterdayInfectedCount = 
      this.getDailyChangeData[this.getDailyChangeData.length - 2].infectedCount;
    this.totalDead = 
      this.getDailyChangeData[this.getDailyChangeData.length - 2].totalDeadCount;
    this.todayDead = this.dailyChangeData[this.dailyChangeData.length - 1].deadCount;
    this.yesterdayDead = this.dailyChangeData[this.dailyChangeData.length - 2].deadCount;
    this.totalDischarge = 
      this.getDailyChangeData[this.getDailyChangeData.length - 2].totalDischargeCount;
    this.todayDischarge = 
      this.getDailyChangeData[this.getDailyChangeData.length - 1].dischargeCount;
    this.yesterdayDischarge = 
      this.getDailyChangeData[this.getDailyChangeData.length - 2].dischargeCount;
  }
};
</script>
