<template>
  <v-col>
    <v-card height="80vh" class="pa-3">
      <v-card-text>
        <p class="display-1">グラフを表示します</p>
         <Chart />
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import Chart from "@/components/Chart.vue";

export default {
  name: "Home",
  components: {
    Chart
  }
};
</script>
