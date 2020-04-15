<template>
  <div>
    <div class="title mb-2 title-color">{{ title }}</div>
    <div v-for="c in contents1" :key="c">
      {{ c }}
    </div>
    <div class="my-4">
      <a
        @mouseover="linkMouseover()"
        @mouseleave="linkMouseover()"
        :style="{ textDecoration: linkStyle }"
        href="https://jag-japan.com/covid19map-readme/"
        >ジャッグジャパン株式会社
        「新型コロナウイルス感染者数マップ」について<span
          class="mdi mdi-open-in-new"
        ></span
      ></a>
    </div>
    <div v-for="c in contents2" :key="c">
      {{ c }}
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    title: "本サイトで利用しているデータについて",
    contents1: [
      "本サイトでは、ジャッグジャパン株式会社 様が提供されているデータを利用しています。",
      "データについては、下記リンク先に記載の事項を確認した上で非営利目的で利用しています。"
    ],
    contents2: [
      "上記リンク先と重複する内容にはなりますが、データの取り扱いについては最新の注意を払っています。",
      "ただし当サイトでは、データの完全性についての保証及びデータの誤りにより生じた損害等に対して、一切の責任を負いません。",
      "また当サイト及び掲載している情報については、当サイトの一存により公開を停止する場合がございますがご了承ください。"
    ],
    linkStyle: "none"
  }),
  methods: {
    linkMouseover() {
      this.linkStyle = this.linkStyle === "none" ? "underline" : "none";
    }
  }
};
</script>
<style></style>
