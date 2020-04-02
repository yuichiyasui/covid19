<template>
  <v-app>
    <v-content>
      <Navbar />
      <v-container>
        <v-row justify="center" align-content="center">
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",

  components: {
    Navbar
  },

  data: () => ({})
};
</script>
