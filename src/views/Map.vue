<template>
  <v-col>
    <v-card height="80vh" class="pa-3">
      <v-card-text>
        <p class="display-1">マップを表示します</p>
        <JapanMap />
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
// @ is an alias to /src
import JapanMap from "@/components/JapanMap.vue";

export default {
  name: "Home",
  components: {
    JapanMap
  }
};
</script>
