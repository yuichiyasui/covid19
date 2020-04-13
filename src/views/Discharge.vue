<template>
  <v-col>
    <v-row>
      <v-col>
        <v-card height="90vh" class="pa-3">
          <v-card-text>
            <p class="display-1">退院数推移グラフ</p>
          </v-card-text>
          <DischargeTransitionGraph/>
        </v-card>
        {{ dates[3].discharge }}
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import DischargeTransitionGraph from "@/components/DischargeTransitionGraph.vue";

export default {
  components: {
    DischargeTransitionGraph,
  },
  data(){
        return {
            masterData: this.$store.state.masterData,
            dates: this.$store.getters.getDischargeTransition,
            // maxDate: this.dates[99].count
            
        }
    },
};
</script>
