<template>
  <v-col>
    <p class="display-1">男女別感染者グラフ</p>
    <GenderGraph>
      <doughnut-chart></doughnut-chart>
    </GenderGraph>
    <p class="display-1">年代別感染者グラフ</p>
    <AgeGraph>
      <bar-chart></bar-chart>
    </AgeGraph>
  </v-col>
</template>

<script>
import GenderGraph from "@/components/GenderGraph.vue";
import AgeGraph from "@/components/AgeGraph.vue";

export default {
  name: "Gender",
  components: {
    GenderGraph,
    AgeGraph
  }
};
</script>
