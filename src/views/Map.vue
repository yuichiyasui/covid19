<template>
  <v-col>
    <v-card height="80vh" class="pa-3">
      <v-card-text>
        <p class="display-1">マップを表示します</p>
        <PrefectureGraph></PrefectureGraph>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import PrefectureGraph from "@/components/PrefectureGraph";

export default {
  components: {
    PrefectureGraph,
  },
  data() {},
};
</script>
