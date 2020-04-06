<template>
  <div class="small">
    <line-chart :chart-data="infectedPerson"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>
<script>
  import LineChart from '../LineChart.js'
  export default {
    components: {
      LineChart
    },
    data () {
      return {
        infectedPerson: {
          labels: ["2020/04/01", "2020/04/01", "2020/04/01", "2020/04/01"],
          datasets: [
            {
              label: '感染者数',        
              data: [2, 20, 200, 60]
            }, 
          ]
        },
        date: this.$store.state.masterData
      }
    },
    mounted () {},
    methods: {}
  }
</script>