<template>
  <v-card-text>
    <v-row>
      <v-col>
        <div class="mb-5 text-center">
          <div class="subtitle-1 title-color">感染者数</div>
          <div class="py-2">
            <span class="font-weight-bold display-1"
              >{{ totalInfected.toLocaleString() }} </span
            >人
          </div>
          <div class="body-2">
            <span style="padding-right:14px;">前日</span>：+
            {{ todayInfected.toLocaleString() }} 人
          </div>
          <div class="body-2">
            前々日：+ {{ yesterdayInfected.toLocaleString() }} 人
          </div>
        </div>
      </v-col>
      <v-col>
        <div class="mb-5 text-center">
          <div class="subtitle-1 title-color">退院者数</div>
          <div class="py-2">
            <span class="font-weight-bold display-1"
              >{{ totalDischarge.toLocaleString() }} </span
            >人
          </div>
          <div class="body-2">
            <span style="padding-right:14px;">前日</span>：+
            {{ todayDischarge.toLocaleString() }} 人
          </div>
          <div class="body-2">
            前々日：+ {{ yesterdayDischarge.toLocaleString() }} 人
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="mb-5 text-center">
          <div class="subtitle-1 title-color">死亡者数</div>
          <div class="py-2">
            <span class="font-weight-bold display-1"
              >{{ totalDead.toLocaleString() }} </span
            >人
          </div>
          <div class="body-2">
            <span style="padding-right:14px;">前日</span>：+
            {{ todayDead.toLocaleString() }} 人
          </div>
          <div class="body-2">
            前々日：+ {{ yesterdayDead.toLocaleString() }} 人
          </div>
        </div>
      </v-col>
      <v-col>
        <div class="text-center">
          <div class="subtitle-1 title-color">PCR検査受診者数</div>
          <div class="py-2">
            <span class="font-weight-bold display-1"
              >{{ Number(totalPcr).toLocaleString() }} </span
            >人
          </div>
          <div class="body-2">
            <span style="padding-right:14px;">前日</span>：+
            {{ todayPcr.toLocaleString() }} 人
          </div>
          <div class="body-2">
            前々日：+ {{ yesterdayPcr.toLocaleString() }} 人
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>
export default {
  data() {
    return {
      totalInfected: "集計中", // 感染者数の合計
      todayInfected: "集計中", // 前日の感染者数
      yesterdayInfected: "集計中", // 前々日の感染者数
      totalDischarge: "集計中", // 退院者数の合計
      todayDischarge: "集計中", // 前日の退院者数
      yesterdayDischarge: "集計中", // 前々日の退院者数
      totalDead: "集計中", // 死者数の合計
      todayDead: "集計中", // 前日の死者数
      yesterdayDead: "集計中", // 前々日の死者数
      totalPcr: "集計中", // PCR検査受信者数の合計
      todayPcr: "集計中", // 前日のPCR検査受信者数
      yesterdayPcr: "集計中" // 前々日のPCR検査受信者数
    };
  },
  methods: {
    setData() {
      /** 感染者数 */
      this.totalInfected = this.$store.state.masterData.length;
      var infectedArray = this.$store.getters.getInfectedTransition;
      this.todayInfected = infectedArray[infectedArray.length - 2].count;
      this.yesterdayInfected = infectedArray[infectedArray.length - 3].count;
      /** 退院数 */
      var dischargeTotalArray = this.$store.getters.getDischergeByDayTotal;
      this.totalDischarge = dischargeTotalArray[dischargeTotalArray.length - 1].count
      ;
      var dischargeArray = this.$store.getters.getDischargeTransition;
      this.todayDischarge = 0;
      this.todayDischarge = dischargeArray[dischargeArray.length - 2].count;
      this.yesterdayDischarge = dischargeArray[dischargeArray.length - 3].count;
      /** 死者数 */
      var deadTotalArray = this.$store.getters.getDeadDataByTotal;
      this.totalDead = deadTotalArray[deadTotalArray.length - 1].count;
      var deadArray = this.$store.getters.getDeadDataByDay;
      this.todayDead = deadArray[deadArray.length - 1].count;
      this.yesterdayDead = deadArray[deadArray.length - 2].count;
      /** PCR検査受信者数 */
      var pcrTotalArray = this.$store.getters.getPcrTransition;
      this.totalPcr = pcrTotalArray[pcrTotalArray.length - 1].count;
      var pcrArray = this.$store.getters.getPcrDataByDay;
      this.todayPcr = pcrArray[pcrArray.length - 1].count;
      this.yesterdayPcr = pcrArray[pcrArray.length - 2].count;
    }
  },
  mounted() {
    this.setData();
  }
};
</script>
