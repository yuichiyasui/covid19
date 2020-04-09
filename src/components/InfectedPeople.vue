<template>
    <table border="1">
      <tr>
        <th>感染者数</th>
        <th>回復者数</th>
        <th>死亡者数</th>
      </tr>
      <tr>
        <td>
            {{ masterData.length }}
            <tr>本日：+{{ masterData.length }}</tr>
            <tr>昨日：+{{ masterData.length }}</tr>
        </td>
        <td>
            {{ masterData.length }}
            <tr>本日：+{{ masterData.length }}</tr>
            <tr>昨日：+{{ masterData.length }}</tr>
        </td>
        <td>
            {{ masterData.length }}
            <tr>本日：+{{ masterData.length }}</tr>
            <tr>昨日：+{{ masterData.length }}</tr>
        </td>
      </tr>
    </table>
</template>

<script>
export default {
    data(){
        return {
            masterData: this.$store.state.masterData
        }
    }
}
</script>