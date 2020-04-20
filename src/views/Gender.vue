<template>
  <v-col>
    <p class="display-1">年代別感染者推移グラフ</p>
    <AgeDayGraph></AgeDayGraph>
  </v-col>
</template>

<script>
import AgeDayGraph from "@/components/AgeDayGraph.vue";

export default {
  name: "Gender",
  components: {
    AgeDayGraph,
  },
};
</script>
