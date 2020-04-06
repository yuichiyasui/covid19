<template>
  <div class="graph">
    <h1>PrefectureGraph</h1>
    <table border="1">
      <tr v-for="(pref, i) in getPrefectureData" v-bind:key="i">
        <td v-text="pref.name"></td>
        <td v-text="pref.count"></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "PrefectureGraph",
  computed: {
    getPrefectureData() {
      return this.$store.getters.getPrefectureData;
    },
  },
};
</script>
<style scoped>
.graph {
  color: red;
}
</style>
