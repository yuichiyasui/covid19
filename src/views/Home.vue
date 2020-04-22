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
        <InfectedTransitionGraphCard />
      </v-col>
      <v-col sm="4">
        <List />
      </v-col>
      <v-col sm="4">
        <transition-dead-card />
      </v-col>
      <v-col sm="4">
        <DischargeTransitionGraphCard />
      </v-col>
      <v-col sm="4">
        <GenderCard />
      </v-col>
      <v-col sm="4">
        <AgeCard />
      </v-col>
      <v-col sm="8">
        <v-card outlined class="pa-3 mb-4">
          <v-card-text class="pa-0">
            <v-card-title class="title-color"
              >年代別感染者推移グラフ</v-card-title
            >
            <AgeDayGraph></AgeDayGraph>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="4">
        <PrefectureGraphCard />
      </v-col>
      <v-col sm="4">
        <IndividualPrefectureGraphCard />
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
import PrefectureGraphCard from "@/components/prefecture/PrefectureGraphCard";
import IndividualPrefectureGraphCard from "@/components/prefecture/IndividualPrefectureGraphCard";
import JapanMap from "@/components/JapanMap";
import List from "@/components/List.vue";
import InfectedTransitionGraphCard from "@/components/infected/InfectedTransitionGraphCard.vue";
import InfectedPeople from "@/components/InfectedPeople.vue";
import GenderCard from "@/components/gender/GenderCard.vue";
import AgeCard from "@/components/age/AgeCard.vue";
import TransitionDeadCard from "@/components/dead/TransitionDeadCard";
import DischargeTransitionGraphCard from "@/components/discharge/DischargeTransitionGraphCard.vue";
import AgeDayGraph from "@/components/AgeDayGraph.vue";
import PcrTransitionGraph from "@/components/PcrTransitionGraph.vue";
import store from "../store";

export default {
  components: {
    PrefectureGraphCard,
    JapanMap,
    List,
    InfectedTransitionGraphCard,
    InfectedPeople,
    GenderCard,
    AgeCard,
    TransitionDeadCard,
    IndividualPrefectureGraphCard,
    AgeDayGraph,
    PcrTransitionGraph,
    DischargeTransitionGraphCard,
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
