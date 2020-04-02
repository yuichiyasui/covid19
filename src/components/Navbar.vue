<template>
  <v-app-bar app color="#26A69A" dark fixed>
    <h1>
      <router-link to="/" class="display-1 font-weight-thin white--text"
        >COVID-19</router-link
      >
    </h1>
    <v-spacer></v-spacer>
    <v-btn class="mr-2" text
      ><router-link to="/" class="title font-weight-light white--text"
        >Home</router-link
      ></v-btn
    >
    <v-btn class="mr-2" text
      ><router-link to="/about" class="title font-weight-light white--text"
        >About</router-link
      ></v-btn
    >
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn class="mr-2" text v-on="on"
          ><span class="title font-weight-light white--text">Data</span
          ><span class="mdi mdi-menu-down"></span
        ></v-btn>
      </template>
      <v-list>
        <v-list-item-group v-model="model">
          <v-subheader>Data</v-subheader>
          <v-list-item v-for="(item, i) in items" :key="i" @click="click(i)">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>

export default {
  name: "Navbar",
  data: () => ({
    items: [
      {
        icon: "mdi-map-marker",
        text: "感染状況マップ"
      },
      {
        icon: "mdi-chart-bar",
        text: "各種グラフ"
      }
    ],
    model: 1
  }),
  methods: {
    click(i){
      if(i === 0){
        this.$router.push('/map');
      }
      if(i === 1){
        this.$router.push('/graph');
      }
    }
    }
};
</script>

<style scoped>
a {
  text-decoration-line: none;
}
</style>
