<template>
  <v-card outlined class="pa-3 mb-4">
    <v-card-text class="pa-0">
      <v-card-title class="title-color">感染者推移</v-card-title>
      <InfectedTransitionGraph>
        <date-person-chart></date-person-chart>
      </InfectedTransitionGraph>
    </v-card-text>
  </v-card>
</template>
<script>
import InfectedTransitionGraph from "@/components/infected/InfectedTransitionGraph.vue";
export default {
  components: {
    InfectedTransitionGraph
  }
};
</script>
