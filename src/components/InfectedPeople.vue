<template>
    <table border="1">
      <tr>
        <th>感染者数</th>
        <th>回復者数</th>
        <th>死亡者数</th>
      </tr>
      <tr>
        <td>
            {{ masterData.length }} 人
            <tr>本日：+ {{ dates[dates.length - 1].count }} 人</tr>
            <tr>昨日：+ {{ dates[dates.length - 2].count }} 人</tr>
        </td>
        <td>
            {{ totalDischarge }} 人
            <tr>本日：+ {{ todayDead[todayDead.length - 1].discharge }}</tr>
            <tr>昨日：+ {{ todayDead[todayDead.length - 2].discharge }}</tr>
        </td>
        <td>
            {{ totalDead }} 人 
            <tr>本日：+ {{ todayDead[todayDead.length - 1].dead }}</tr>
            <tr>昨日：+ {{ todayDead[todayDead.length - 2].dead }}</tr>
        </td>
      </tr>
    </table>
</template>

<script>
export default {
    data(){
        return {
            masterData: this.$store.state.masterData,
            dates: this.$store.getters.getDates,
            totalDead: 0,
            totalDischarge: 0,
            todayDead: this.$store.getters.getDischargeTransition
            
        }
    },
    computed: {
    gettotalDate: function () {
      return this.$store.getters.getDeadDeta;
    },
    gettotalDischarge: function () {
      return this.$store.getters.getDischarge;
    },
  },

  mounted() {
    this.totalDead = this.gettotalDate;
    this.totalDischarge = this.gettotalDischarge;
  },
}
</script>