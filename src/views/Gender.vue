<template>
  <v-col>
    <p class="display-1">年代・日別感染者グラフ</p>
    <AgeDayGraph></AgeDayGraph>
  </v-col>
</template>

<script>
import AgeDayGraph from "@/components/AgeDayGraph.vue";

export default {
  name: "Gender",
  components: {
    AgeDayGraph
  }
};
</script>
