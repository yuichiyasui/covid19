<template>
    <table border="1">
      <tr>
        <th>感染者数</th>
        <th>回復者数</th>
        <th>死亡者数</th>
      </tr>
      <tr>
        <td>
            {{ masterData.length }} 人
            <tr>本日：+ {{ dates[dates.length - 1].count }} 人</tr>
            <tr>昨日：+ {{ dates[dates.length - 2].count }} 人</tr>
        </td>
        <td>
            不明
            <tr>本日：+ 不明</tr>
            <tr>昨日：+ 不明</tr>
        </td>
        <td>
            不明
            <tr>本日：+ 不明</tr>
            <tr>昨日：+ 不明</tr>
        </td>
      </tr>
    </table>
</template>

<script>
export default {
    data(){
        return {
            masterData: this.$store.state.masterData,
            dates: this.$store.getters.getDates,
            // maxDate: this.dates[99].count
            
        }
    },
}
</script>