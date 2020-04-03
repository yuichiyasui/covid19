<template>
  <v-col>
    <v-card height="80vh" class="pa-3">
      <v-card-text>
        <p class="display-1">マップを表示します</p>
        <table border="1">
          <tr v-for="(big, i) in convertBigArray()" v-bind:key="i">
            <td v-text="convertMiniArray(big)">
            </td>
          </tr>
        </table>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      masterData: this.$store.state.masterData
    };
  },
  methods: {
    convertBigArray() {
      var bigArray = [];
      bigArray = this.masterData.data.split("\r\n");
      bigArray.splice(0);
      return bigArray;
    },
    convertMiniArray(big) {
      var miniArray = big.split(",");
      // 居住都道府県
      return miniArray[10];
    }
  }
};
</script>
