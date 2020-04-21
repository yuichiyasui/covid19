<template>
  <v-card-text>
    <div class="mb-7">
      <div class="subtitle-1 title-color">感染者数</div>
      <span class="font-weight-bold display-1"
        >{{ totalInfected.toLocaleString() }} </span
      >人
      <div class="body-2">
        本日：+ {{ todayInfected.toLocaleString() }} 人
      </div>
      <div class="body-2">
        昨日：+ {{ yesterdayInfected.toLocaleString() }} 人
      </div>
    </div>
    <div class="mb-7">
      <div class="subtitle-1 title-color">回復者数</div>
      <span class="font-weight-bold display-1"
        >{{ totalDischarge.toLocaleString() }} </span
      >人
      <div class="body-2">本日：+ {{ todayDischarge.toLocaleString() }} 人</div>
      <div class="body-2">
        昨日：+ {{ yesterdayDischarge.toLocaleString() }} 人
      </div>
    </div>
    <div>
      <div class="subtitle-1 title-color">死亡者数</div>
      <span class="font-weight-bold display-1"
        >{{ totalDead.toLocaleString() }} </span
      >人
      <div class="body-2">本日：+ {{ todayDead.toLocaleString() }} 人</div>
      <div class="body-2">昨日：+ {{ yesterdayDead.toLocaleString() }} 人</div>
    </div>
  </v-card-text>
</template>

<script>
export default {
  data() {
    return {
      totalInfected: "集計中", // 感染者数の合計
      todayInfected: "集計中", // 本日の感染者数
      yesterdayInfected: "集計中", // 昨日の感染者数
      totalDischarge: "集計中", // 退院者数の合計
      todayDischarge: "集計中", // 本日の退院者数
      yesterdayDischarge: "集計中", // 昨日の退院者数
      totalDead: "集計中", // 死者数の合計
      todayDead: "集計中", // 本日の死者数
      yesterdayDead: "集計中" // 昨日の死者数
    };
  },
  methods: {
    setData() {
      /** 感染者数 */ 
      this.totalInfected = this.$store.state.masterData.length;
      var infectedArray = this.$store.getters.getInfectedTransition;
      this.todayInfected = infectedArray[infectedArray.length - 1].count;
      this.yesterdayInfected = infectedArray[infectedArray.length - 2].count;
      /** 退院数 */
      
      /** 死者数 */
      var deadTotalArray = this.$store.getters.getDeadDataByTotal
      this.totalDead = deadTotalArray[deadTotalArray.length -1].count;
      var deadArray = this.$store.getters.getDeadDataByDay;
      this.todayDead = deadArray[deadArray.length - 1 ].count;
      this.yesterdayDead = deadArray[deadArray.length - 2 ].count;
    }
  },

  mounted() {
    this.setData();
  }
};
</script>
