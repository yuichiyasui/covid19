<template>
  <v-app>
    <v-content id="main">
      <Navbar />
      <v-container fluid fill-height class="px-3">
        <v-row justify="center">
          <Loading v-show="loading"></Loading>
          <router-view v-show="!loading"></router-view>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Loading from "@/components/common/Loading";
import Navbar from "@/components/common/Navbar";
export default {
  name: "App",
  components: {
    Navbar,
    Loading,
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
};
</script>
<style scoped>
#main {
  background-color: #fff7ef;
}
</style>
