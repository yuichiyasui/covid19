<template>
  <div>
    <v-app-bar app color="rgba(245, 124, 0)" hide-on-scroll dark fixed>
      <h1>
        <router-link to="/" class="display-1 font-weight-thin white--text"
          >COVID-19</router-link
        >
      </h1>
      <v-spacer></v-spacer>
      <v-toolbar-items class="d-none d-sm-flex d-md-flex d-lg-flex">
        <v-btn text
          ><router-link to="/" class="title font-weight-light white--text"
            >Home</router-link
          ></v-btn
        >
        <v-btn text
          ><router-link to="/about" class="title font-weight-light white--text"
            >About</router-link
          ></v-btn
        >
      </v-toolbar-items>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="d-flex d-sm-none"
        right
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer height="100vh" v-model="drawer" temporary light fixed>
      <v-subheader>Menu</v-subheader>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item @click="click('home')">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="click('about')">
          <v-list-item-icon>
            <v-icon>mdi-web</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  data: () => {
    return {
      drawer: null,
      model: 1
    };
  },
  methods: {
    click(i) {
      if (i === "home") {
        this.$router.push("/");
      }
      if (i === "about") {
        this.$router.push("/about");
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
