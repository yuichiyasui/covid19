<template>
  <v-col>
    <v-row>
      <v-col>
        <v-card class="pa-3 mb-4">
          <v-card-text>
            <p class="title">都道府県別感染者数</p>
            <div id="prefecture-graph-frame">
              <PrefectureGraph></PrefectureGraph>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-3">
          <v-card-text>
            <p class="title">日本国内感染者数分布マップ</p>
              <JapanMap />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import PrefectureGraph from "@/components/PrefectureGraph";
import JapanMap from "@/components/JapanMap";

export default {
  components: {
    PrefectureGraph,
    JapanMap
  },
};
</script>

<style scoped>
#prefecture-graph-frame {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
