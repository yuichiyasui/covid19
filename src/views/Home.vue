<template>
  <v-col>
    <v-row>
      <v-col sm="3">
        <v-card outlined="false" class="pa-3 mb-4">
          <v-card-text>
            <v-card-title class="title-color">日本国内の状況</v-card-title>
            <InfectedPeople />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="5">
        <v-card outlined="false" class="pa-3 mb-4">
          <v-card-text>
            <v-card-title class="title-color">感染者推移グラフ</v-card-title>
            <TransitionGraph>
              <date-person-chart></date-person-chart>
            </TransitionGraph>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="4">
        <v-card outlined="false" class="pa-3 mb-4">
          <v-card-text>
            <v-card-title class="title-color">男女別感染者グラフ</v-card-title>
            <GenderGraph>
              <doughnut-chart></doughnut-chart>
            </GenderGraph>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="4">
        <v-card outlined="false" class="pa-3 mb-4">
          <v-card-text>
            <v-card-title class="title-color">年代別感染者グラフ</v-card-title>
            <AgeGraph>
              <bar-chart></bar-chart>
            </AgeGraph>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="4">
        <v-card outlined="false" class="pa-3 mb-4">
          <v-card-text>
            <v-card-title class="title-color">死亡者数推移</v-card-title>
            <TransitionDead>
              <date-person-chart></date-person-chart>
            </TransitionDead>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="4">
        <v-card outlined="false" class="pa-3 mb-4">
          <v-card-text>
            <v-card-title class="title-color">退院者数推移</v-card-title>
            <DischargeTransitionGraph></DischargeTransitionGraph>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="8">
        <List />
      </v-col>
      <v-col sm="8">
        <v-card outlined="false" class="pa-3 mb-4">
          <v-card-text>
            <v-card-title class="title-color">都道府県別感染者数</v-card-title>
            <div id="prefecture-graph-frame">
              <PrefectureGraph></PrefectureGraph>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="4">
        <v-card outlined="false" class="pa-3 mb-4">
          <v-card-text>
            <v-card-title class="title-color"
              >日本国内感染者数分布マップ</v-card-title
            >
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
import List from "@/components/List.vue";
import TransitionGraph from "@/components/TransitionGraph.vue";
import InfectedPeople from "@/components/InfectedPeople.vue";
import GenderGraph from "@/components/GenderGraph.vue";
import AgeGraph from "@/components/AgeGraph.vue";
import TransitionDead from "@/components/TransitionDead";
import DischargeTransitionGraph from "@/components/DischargeTransitionGraph.vue";
import store from "../store";

export default {
  components: {
    PrefectureGraph,
    JapanMap,
    List,
    TransitionGraph,
    InfectedPeople,
    GenderGraph,
    AgeGraph,
    TransitionDead,
    DischargeTransitionGraph
  },
  async beforeRouteEnter(to, from, next) {
    await store.dispatch("fetchMasterData");
    next();
  }
};
</script>

<style>
#prefecture-graph-frame {
  position: relative;
  width: 100%;
  height: 100%;
}
.theme--light.v-card.v-card--outlined {
  border: thin solid #f57c00;
  border-width: 2px;
}
.title-color {
  color: #f57c00;
}
</style>
