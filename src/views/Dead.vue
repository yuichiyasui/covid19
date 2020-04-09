<template>
  <v-col>
  
    
       <v-card height="50vh" class="pa-3">
          <v-card-text>
            <p class="display-1">合計死者数</p>
          </v-card-text>
         <h1> <totalDead></totalDead></h1>
        </v-card>
    
       <v-card height="50vh" class="pa-3">
          <v-card-text>
            <p class="display-1">感染者推移グラフ</p>
          </v-card-text>
          <TransitionDead>
            <date-person-chart></date-person-chart>
          </TransitionDead>
        </v-card>
    
  </v-col>
</template>

<script>
import TotalDead from "@/components/TotalDead";
import TransitionDead from "@/components/TransitionDead"
export default {
  components: {
    TotalDead,
    TransitionDead
  },
};

</script>
