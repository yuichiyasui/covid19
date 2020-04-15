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
        本日：+ {{ todayDead[todayDead.length - 1].discharge }} 人
      </div>
      <div class="body-2">
        昨日：+ {{ todayDead[todayDead.length - 2].discharge }} 人
      </div>
    </div>
    <div>
      <div class="subtitle-1 title-color">死亡者数</div>
      <span class="font-weight-bold display-1">{{ totalDead }} </span>人
      <div class="body-2">
        本日：+ {{ todayDead[todayDead.length - 1].dead }} 人
      </div>
      <div class="body-2">
        昨日：+ {{ todayDead[todayDead.length - 2].dead }} 人
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
      totalDischarge: 0,
      todayDead: this.$store.getters.getDischargeTransition
    };
  },
  computed: {
    gettotalDate: function() {
      return this.$store.getters.getDeadDeta;
    },
    gettotalDischarge: function() {
      return this.$store.getters.getDischarge;
    }
  },

  mounted() {
    this.totalDead = this.gettotalDate;
    this.totalDischarge = this.gettotalDischarge;
  }
};
</script>
