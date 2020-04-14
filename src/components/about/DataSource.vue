<template>
  <div>
    <div class="title mb-2 title-color">{{ title }}</div>
    <div v-for="c in contents" :key="c">
      {{ c }}
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    title: "本サイトで利用しているデータについて",
    contents: [
      "本サイトでは、ジャッグジャパン株式会社 様が提供されているデータを利用しております。",
      "ジャッグジャパン株式会社 「新型コロナウイルス感染者数マップ」について：https://jag-japan.com/covid19map-readme/#i-9"
    ]
  })
};
</script>
