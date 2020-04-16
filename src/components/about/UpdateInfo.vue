<template>
  <v-card outlined>
    <v-card-text class="mx-2 mt-2">
      <div class="title title-color mb-4">{{ title }}</div>
      <div v-for="(c, i) in contents" :key="i" class="mb-2">
        <div class="font-weight-black">
          {{ c.date }}
        </div>
        <div class="py-2" v-html="c.content"></div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      title: "更新情報",
      contents: [
        { date: "2020.04.07", content: "当サイトをオープンしました。" },
        { date: "2020.04.16", content: "更新情報を表示するようにしました。" },
        {
          date: "2020.04.17",
          content:
            "年代別の感染者数の推移グラフを追加しました。<br>各都道府県別の感染者推移グラフを追加しました。"
        }
      ]
    };
  }
};
</script>
