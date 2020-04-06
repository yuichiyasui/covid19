<template>
  <div class="home">
    <div class="mt-12">
      <p class="display-3">COVID-19</p>
      <p class="display-1">
        日本国内における新型コロナウイルス感染症の情報を発信
      </p>
    </div>
    <table border="1">
      <tr>
        <th>No</th>
        <th>年代</th>
        <th>性別</th>
        <th>確定日</th>
        <th>居住都道府県</th>
        <th>ステータス</th>
      </tr>
    <tr v-for="(d, i) in this.$store.state.masterData" :key="i">
      <td >{{ i  + 1}}</td>
      <td v-for="(key,j) of d" :key="j">{{ key }}</td>
    </tr>
    </table>
  </div>
</template>
