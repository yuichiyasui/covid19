<template>
  <v-col>
    <v-card height="80vh" class="pa-3">
      <v-card-text>
        <p class="display-1">マップを表示します</p>
        <table border="1">
          <tr v-for="(pref, i) of resultArray" v-bind:key="i">
            <td v-text="pref.name"></td>
            <td v-text="pref.count"></td>
          </tr>
        </table>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import PREF_ARRAY from "../assets/js/prefecture";

export default {
  mounted() {
    for (let i = 0; i < this.prefArray.length; i++) {
      var prefecture = { id: i, name: this.prefArray[i], count: 0 };
      this.resultArray.push(prefecture);
    }
    for (let j = 0; j < this.masterData.length; j++) {
      this.showPrefData(this.masterData[j].residence);
    }
  },
  data() {
    return {
      masterData: this.$store.state.masterData,
      resultArray: [], // 都道府県オブジェクトが格納される配列
      prefArray: PREF_ARRAY,
    };
  },
  methods: {
    showPrefData(pref) {
      for (let i = 0; i < this.prefArray.length; i++) {
        if (pref === this.resultArray[i].name) {
          this.resultArray[i].count++;
          return;
        }
      }
      this.resultArray[48].count++;
      return;
    }
  }
};
</script>
