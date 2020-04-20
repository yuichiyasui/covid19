<template>
  <div>
    <v-app-bar app color="rgba(245, 124, 0, 0.9)" hide-on-scroll dark fixed>
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
        <!-- <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn class="mr-2" text v-on="on"
              ><span class="title font-weight-light white--text">Data</span
              ><span class="mdi mdi-menu-down"></span
            ></v-btn>
          </template>
          <v-list>
            <v-list-item-group v-model="model">
              <v-subheader>Data</v-subheader>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                @click="click(i)"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu> -->
      </v-toolbar-items>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="d-flex d-sm-none"
        right
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary light>
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
        <!-- <v-list-item v-for="(item, i) in items" :key="i" @click="click(i)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  data: () => {
    return {
      items: [
        {
          icon: "mdi-chart-bar",
          text: "各種グラフ",
        },
        {
          icon: "mdi-chart-bar",
          text: "性別・年代別",
        },
        {
          icon: "mdi-chart-bar",
          text: "死亡者数",
        },
        {
          icon: "mdi-chart-bar",
          text: "退院者数",
        },
      ],
      drawer: null,
      model: 1,
    };
  },
  methods: {
    click(i) {
      if (i === 0) {
        this.$router.push("/graph");
      }
      if (i === 1) {
        this.$router.push("/gender");
      }
      if (i === 2) {
        this.$router.push("/dead");
      }
      if (i === 3) {
        this.$router.push("/discharge");
      }
      if (i === "home") {
        // 現在のパスが'/'なら、エラーが出るため何もしないようにしたい
        this.$router.push("/");
      }
      if (i === "about") {
        this.$router.push("/about");
      }
    },
  },
};
</script>

<style scoped>
a {
  text-decoration-line: none;
}
</style>
