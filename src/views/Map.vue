<template>
  <v-col>
    <v-card height="80vh" class="pa-3">
      <v-card-text>
        <p class="display-1">マップを表示します</p>
        {{ masterData }}
        <JapanMap />
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import JapanMap from "@/components/JapanMap.vue";

export default {
  mounted(){
     this.masterData = this.$store.state.masterData.data;
  },
  data() {
    return {
      masterData :{}
    }
  },
  methods:{
    toArray(){
      this.masterData;
    }
  },
  name: "Home",
  components: {
    JapanMap
  }
};
</script>
