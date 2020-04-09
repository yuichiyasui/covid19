<template>
  <v-app>
    <v-content>
      <Navbar />
      <v-container fluid fill-height>
        <v-row justify="center">
          <Loading v-show="loading"></Loading>
          <router-view v-show="!loading"></router-view>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Loading from '@/components/Loading';
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  data(){
    return {
      loading: true
    }
  },
  components: {
    Navbar,
    Loading
  },
  beforeCreate() {
    this.$store.dispatch("fetchMasterData");
  },
  mounted(){
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
};
</script>
