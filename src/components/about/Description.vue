<template>
  <div>
    <div class="title mb-2 title-color">当サイトについて</div>
    <div v-for="c in contents" :key="c">
      {{ c }}
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    contents: [
      "当サイトは日本国内における新型コロナウイルス感染症(COVID-19)に関する情報サイトです。"
    ]
  })
};
</script>
