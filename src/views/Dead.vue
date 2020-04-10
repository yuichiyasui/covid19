<template>

 <v-col>
    <p class="display-1">合計死者数</p>
    <GenderGraph>
      <totalDead></totalDead>
    </GenderGraph>
    <p class="display-1">感染者推移グラフ</p>
    <TransitionDead>
            <date-person-chart></date-person-chart>
          </TransitionDead>
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
