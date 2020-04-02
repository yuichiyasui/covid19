<template>
  <v-app-bar app color="#C8E6C9" dark>
    <div class="d-flex align-center">
      <h1>COVID-19</h1>
    </div>

    <v-spacer></v-spacer>

    <v-btn
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      target="_blank"
      text
    >
      <span class="mr-2">Latest Release</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: "Navbar",
  data: () => ({})
};
</script>
