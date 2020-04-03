<template>
  <v-col>
    <v-card height="80vh" class="pa-3">
      <p class="display-1">男女別感染者グラフを表示します</p>
      <GenderGraph>
        <doughnut-chart></doughnut-chart>
      </GenderGraph>
    </v-card>
  </v-col>
</template>

<script>
import GenderGraph from "@/components/GenderGraph.vue";

export default {
  name: "Gender",
  components: {
    GenderGraph
  }
};
</script>
