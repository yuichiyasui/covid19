<template>
  <div class="home">
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
      <v-card class="pa-3 mb-4">
        <v-card-text>
          <p class="title">日本国内感染者数分布マップ</p>
          <JapanMap />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <List />
    </v-col>
    <v-col>
      <v-card class="pa-3 mb-4">
        <v-card-text>
          <p class="title">日本国内の状況</p>
          <InfectedPeople />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card class="pa-3 mb-4">
        <v-card-text>
          <p class="title">感染者推移グラフ</p>
          <TransitionGraph>
            <date-person-chart></date-person-chart>
          </TransitionGraph>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card class="pa-3 mb-4">
        <v-card-text>
          <p class="title">男女別感染者グラフ</p>
          <GenderGraph>
            <doughnut-chart></doughnut-chart>
          </GenderGraph>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card class="pa-3 mb-4">
        <v-card-text>
          <p class="title">年代別感染者グラフ</p>
          <AgeGraph>
            <bar-chart></bar-chart>
          </AgeGraph>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card class="pa-3 mb-4">
        <v-card-text>
          <p class="title">死亡者数</p>
          <totalDead></totalDead>
        </v-card-text>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import PrefectureGraph from "@/components/PrefectureGraph";
import JapanMap from "@/components/JapanMap";
import List from "@/components/List.vue";
import TransitionGraph from "@/components/TransitionGraph.vue";
import InfectedPeople from "@/components/InfectedPeople.vue";
import GenderGraph from "@/components/GenderGraph.vue";
import AgeGraph from "@/components/AgeGraph.vue";
import TotalDead from "@/components/TotalDead";

export default {
  components: {
    PrefectureGraph,
    JapanMap,
    List,
    TransitionGraph,
    InfectedPeople,
    GenderGraph,
    AgeGraph,
    TotalDead,
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
