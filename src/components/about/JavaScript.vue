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
    title: "JavaScriptについて",
    contents: [
      "当サイトではJavaScriptを使用しております。",
      "JavaScriptを無効にして使用された場合、各ページが正常に動作しない、または、表示されない場合がございます。",
      "当サイトをご利用の際には、JavaScriptを有効にして頂きますようお願いいたします。"
    ]
  })
};
</script>
