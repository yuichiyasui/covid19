<template>
  <v-col>
    <p class="display-1">感染者推移グラフ</p>
    <TransitionDead />>
  </v-col>
</template>

<script>
import TransitionDead from "@/components/TransitionDead";
export default {
  components: {
    TransitionDead,
  },
};
</script>
