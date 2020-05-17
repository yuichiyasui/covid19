<template>
  <div class="fullview">
    <div class="loading-spacer"></div>
    <vue-loading
      type="spiningDubbles"
      color="#F57C00"
      :size="{ width: '100px', height: '100px' }"
    >
    </vue-loading>
  </div>
</template>

<script>
import { VueLoading } from "vue-loading-template";

export default {
  components: {
    VueLoading,
  },
};
</script>

<style>
.fullview {
  width: 100%;
  height: 100%;
  background: #fefefe;
  position: fixed;
  top: 0;
  left: 0;
}
.loading-spacer {
  height: 50%;
}
</style>
