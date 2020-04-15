<template>
  <v-card-text>
    <div class="mb-7">
      <div class="subtitle-1 title-color">感染者数</div>
      <span class="font-weight-bold display-1">{{ masterData.length.toLocaleString() }} </span>人
      <div class="body-2">本日：+ {{ dates[dates.length - 1].count }} 人</div>
      <div class="body-2">昨日：+ {{ dates[dates.length - 2].count }} 人</div>
    </div>
    <div class="mb-7">
      <div class="subtitle-1 title-color">回復者数</div>
      <span class="font-weight-bold display-1">{{ totalDischarge }} </span>人
      <div class="body-2">
        本日：+ {{ todayDischarge }} 人
      </div>
      <div class="body-2">
        昨日：+ {{ yesterdayDischarge }} 人
      </div>
    </div>
    <div>
      <div class="subtitle-1 title-color">死亡者数</div>
      <span class="font-weight-bold display-1">{{ totalDead }} </span>人
      <div class="body-2">
        本日：+ {{ todayDead }} 人
      </div>
      <div class="body-2">
        昨日：+ {{ yesterdayDead }} 人
      </div>
    </div>
  </v-card-text>
</template>

<script>
export default {
  data() {
    return {
      masterData: this.$store.state.masterData,
      dates: this.$store.getters.getDates,
      totalDead: 0,
      todayDead: 0,
      yesterdayDead: 0,
      todayDischarge: 0,
      yesterdayDischarge: 0,
      totalDischarge: 0,
    };
  },
  computed: {
    getDateArray: function() {
      return this.$store.getters.getDeadDates;
    },
    getDischargeArray: function() {
      return this.$store.getters.getDischargeDates;
    }
  },

  mounted() {
    this.totalDead = this.getDateArray[this.getDateArray.length - 2].todayDead;
    //今日の死者数を処理したいが0
    this.yesterdayDead = this.getDateArray[this.getDateArray.length - 2].todayDead - this.getDateArray[this.getDateArray.length - 3].todayDead;
    this.totalDischarge = this.getDischargeArray[this.getDischargeArray.length - 1].totalDischarge;
    this.todayDischarge = this.getDischargeArray[this.getDischargeArray.length - 1].todayDischarge;
    this.yesterdayDischarge = this.getDischargeArray[this.getDischargeArray.length - 2].todayDischarge;
  }
};
</script>
