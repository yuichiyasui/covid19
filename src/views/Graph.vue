<template>
  <v-col>
    <v-row>
      <v-col>
        <v-card height="90vh" class="pa-3">
          <v-card-text>
            <p class="display-1">日本国内の状況</p>
          </v-card-text>
          <InfectedPeople />
        </v-card>
      </v-col>
      <v-col>
        <v-card height="90vh" class="pa-3">
          <v-card-text>
            <p class="display-1">感染者推移</p>
          </v-card-text>
          <TransitionGraph>
            <date-person-chart></date-person-chart>
          </TransitionGraph>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import TransitionGraph from "@/components/TransitionGraph.vue";
import InfectedPeople from "@/components/InfectedPeople.vue";

export default {
  name: "Graph",
  components: {
    TransitionGraph,
    InfectedPeople
  }
};
</script>
