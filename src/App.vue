<template>
  <v-app>
    <v-content>
      <Navbar />
      <v-container fluid fill-height class="px-7">
        <v-row justify="center">
          <Loading v-show="is_loading"></Loading>
          <router-view v-show="!is_loading"></router-view>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  // data() {
  //   return {
  //     loading: true
  //   };
  // },
  components: {
    Navbar,
    Loading
  },
  computed:{
    is_loading(){
      return this.$store.state.is_loading
    }
  },
  // created() {
  //   // this.$store.dispatch("fetchMasterData");
  // },
  // mounted() {
  //   setTimeout(() => {
  //     this.loading = false;
  //   }, 1000);
  // }
};
</script>
