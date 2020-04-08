<template>
  <v-col>
    <v-row>
      <v-col>
        <v-card height="80vh" class="pa-3">
          <v-card-text>
          <p class="display-1">感染者推移グラフを表示します</p>
          <TransitionGraph />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import TransitionGraph from "@/components/TransitionGraph.vue";

export default {
  name: "Home",
  components: {
    TransitionGraph
  }
};
</script>
