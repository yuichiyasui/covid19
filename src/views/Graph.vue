<template>
  <v-col>
    <v-card height="80vh" class="pa-3">
      <v-card-text>
        <p class="display-1">グラフを表示します</p>
        <Chart />
      </v-card-text>
    </v-card>
    <v-card height="80vh" class="pa-3">
      <v-card-text>
        <p class="display-1">感染者推移グラフを表示します</p>
        <TransitionGraph />
      </v-card-text>
    </v-card>
    <v-card height="80vh" class="pa-3">
      <p class="display-1">男女別感染者グラフを表示します</p>
      <GenderGraph>
        <doughnut-chart></doughnut-chart>
      </GenderGraph>
    </v-card>
  </v-col>
</template>

<script>
import Chart from "@/components/Chart.vue";
import GenderGraph from "@/components/GenderGraph.vue";
import TransitionGraph from "@/components/TransitionGraph.vue";

export default {
  name: "Home",
  components: {
    Chart,
    TransitionGraph,
    GenderGraph
  }
};
</script>
