<template>
  <div>
    <v-card-text>
      <h2>{{ totalDead }}人</h2>
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
