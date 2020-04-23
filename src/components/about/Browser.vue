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
    title: "ブラウザについて",
    contents: [
      "当サイトでは、Google Chrome（最新版）での閲覧を推奨しております。",
      "その他のブラウザでの閲覧に関しては正常に動作しない可能性があります。"
    ]
  })
};
</script>
