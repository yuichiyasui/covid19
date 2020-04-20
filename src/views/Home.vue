<template>
  <v-col>
    <v-row>
      <v-col sm="2">
        <v-card outlined class="pa-3 mb-4">
          <v-card-text class="pa-0">
            <v-card-title class="title-color">日本国内の状況</v-card-title>
            <InfectedPeople />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="6">
        <v-card outlined class="pa-3 mb-4">
          <v-card-text class="pa-0">
            <v-card-title class="title-color">感染者推移</v-card-title>
            <TransitionGraph>
              <date-person-chart></date-person-chart>
            </TransitionGraph>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="4">
        <List />
      </v-col>
      <v-col sm="4">
        <transition-dead-card />
      </v-col>
      <v-col sm="4">
        <v-card outlined class="pa-3 mb-4">
          <v-card-text class="pa-0">
            <v-card-title class="title-color">退院者数推移</v-card-title>
            <DischargeTransitionGraph></DischargeTransitionGraph>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="4">
        <GenderCard />
      </v-col>
      <v-col sm="4">
        <v-card outlined class="pa-3 mb-4">
          <v-card-text class="pa-0">
            <v-card-title class="title-color">年代別感染者グラフ</v-card-title>
            <AgeGraph>
              <bar-chart></bar-chart>
            </AgeGraph>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="8">
        <v-card outlined class="pa-3 mb-4">
          <v-card-text class="pa-0">
            <v-card-title class="title-color"
              >年代別感染者推移グラフ</v-card-title
            >
            <AgeDayGraph><date-person-chart></date-person-chart></AgeDayGraph>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="4">
        <v-card outlined class="pa-3 mb-4">
          <v-card-text class="pa-0">
            <v-card-title class="title-color"
              >都道府県別累積感染者数</v-card-title
            >
            <div id="prefecture-graph-frame">
              <PrefectureGraph style="width:1000px;"></PrefectureGraph>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="4">
        <Prefecture />
      </v-col>
      <v-col sm="4">
        <JapanMap />
      </v-col>
      <v-col sm="4">
        <v-card outlined class="pa-3 mb-4">
          <v-card-text class="pa-0">
            <v-card-title class="title-color">PCR検査数推移</v-card-title>
            <PcrTransitionGraph></PcrTransitionGraph>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import PrefectureGraph from "@/components/prefecture/PrefectureGraph";
import Prefecture from "@/components/prefecture/Prefecture";
import JapanMap from "@/components/JapanMap";
import List from "@/components/List.vue";
import TransitionGraph from "@/components/TransitionGraph.vue";
import InfectedPeople from "@/components/InfectedPeople.vue";
import GenderCard from "@/components/gender/GenderCard.vue";
import AgeGraph from "@/components/AgeGraph.vue";
import TransitionDeadCard from "@/components/dead/TransitionDeadCard";
import DischargeTransitionGraph from "@/components/DischargeTransitionGraph.vue";
import AgeDayGraph from "@/components/AgeDayGraph.vue";
import store from "../store";
import PcrTransitionGraph from "@/components/PcrTransitionGraph.vue";

export default {
  components: {
    PrefectureGraph,
    JapanMap,
    List,
    TransitionGraph,
    InfectedPeople,
    GenderCard,
    AgeGraph,
    TransitionDeadCard,
    DischargeTransitionGraph,
    Prefecture,
    AgeDayGraph,
    PcrTransitionGraph,
  },
  async beforeRouteEnter(to, from, next) {
    await store.dispatch("fetchMasterData");
    next();
  },
};
</script>

<style>
#prefecture-graph-frame {
  overflow-x: auto;
  max-width: 100vw;
}

.theme--light.v-card.v-card--outlined {
  border: thin solid #f57c00;
  border-width: 2px;
}
.title-color {
  color: #f57c00;
}
</style>
