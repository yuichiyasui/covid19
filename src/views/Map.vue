<template>
  <v-col>
    <v-card height="80vh" class="pa-3">
      <v-card-text>
        <p class="display-1">都道府県別感染者数グラフ</p>
        <div class="prefecture-graph">
          <PrefectureGraph></PrefectureGraph>
        </div>
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
};
</script>

<style scoped>
.prefecture {
  width: 500px;
  height: 100vh;
}
.prefecture-graph {
  position: absolute;
  top: 60px;
  left: 10px;
  width: 500px;
  height: 500px;
}
</style>
