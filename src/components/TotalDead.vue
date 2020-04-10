<template>
  <div>
    <v-card-text>
      <div style="font-size: 98%"><font color="#f57c00"><h1>{{ totalDead }}人</h1></font></div>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: "TotalDead",
  data() {
    return {
      totalDead: 0,
    };
  },
  computed: {
    gettotalDate: function () {
      return this.$store.getters.getDeadDeta;
    },
  },

  mounted() {
    this.totalDead = this.gettotalDate;
  },
};
</script>
