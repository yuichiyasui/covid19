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
export default {
  mounted() {
    var bigArray = this.convertBigArray(this.masterData);
    for (let i = 0; i < bigArray.length; i++) {
      this.convertMiniArray(bigArray[i]);
    }
    for (let i = 0; i < this.prefArray.length; i++) {
        this.resultArray.push(new Prefecture(i, this.prefArray[i], 0));
      }
    for (let j = 0; j < bigArray.length; j++) {
      this.showPrefData(this.dataOfPrefArray[j]);
    }
  },
  data() {
    return {
      masterData: this.$store.state.masterData,
      resultArray: [],
      dataOfPrefArray: [],
      prefArray: [
        "北海道",
        "青森県",
        "岩手県",
        "宮城県",
        "秋田県",
        "山形県",
        "福島県",
        "茨城県",
        "栃木県",
        "群馬県",
        "埼玉県",
        "千葉県",
        "東京都",
        "神奈川県",
        "新潟県",
        "富山県",
        "石川県",
        "福井県",
        "山梨県",
        "長野県",
        "岐阜県",
        "静岡県",
        "愛知県",
        "三重県",
        "滋賀県",
        "京都府",
        "大阪府",
        "兵庫県",
        "奈良県",
        "和歌山県",
        "鳥取県",
        "島根県",
        "岡山県",
        "広島県",
        "山口県",
        "徳島県",
        "香川県",
        "愛媛県",
        "高知県",
        "福岡県",
        "佐賀県",
        "長崎県",
        "熊本県",
        "大分県",
        "宮崎県",
        "鹿児島県",
        "沖縄県",
        "不明",
        "その他"
      ]
    };
  },
  methods: {
    convertBigArray(masterData) {
      var bigArray = [];
      bigArray = masterData.split("\r\n");
      bigArray.splice(0, 1);
      return bigArray;
    },
    convertMiniArray(big) {
      var miniArray = big.split(",");
      // 居住都道府県だけ配列にpush
      this.dataOfPrefArray.push(miniArray[10]);
    },
    showPrefData(pref) {
      for (let j = 0; j < this.prefArray.length; j++) {
        if (pref === this.resultArray[j].name) {
          this.resultArray[j].addCount();
          return console.log(this.resultArray[j].name + "にカウント");
        }
      }
      this.resultArray[48].addCount();
      return console.log(this.resultArray[48].name + "にカウント");
    }
  }
};
class Prefecture {
  constructor(id, name, count) {
    this.id = id;
    this.name = name;
    this.count = count;
  }
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }
  get count() {
    return this._count;
  }
  set count(value) {
    this._count = value;
  }
  addCount() {
    this._count++;
  }
}
</script>
