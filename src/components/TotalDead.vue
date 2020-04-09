<template>
  <v-card-text shaped width="200" class="ma-2">
    <v-card-title>国内死亡者</v-card-title>
    <v-card-text>
      <h2>{{ totalDead }}人</h2>
    </v-card-text>
  </v-card-text>
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
    gettotalDate: function() {
      return this.$store.getters.getDeadDeta;
    },
  },

  mounted() {
    this.totalDead = this.gettotalDate;
  },
};
</script>
