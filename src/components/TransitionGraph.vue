<template>
  <div class="small">
    <line-chart :chart-data="infectedPerson"></line-chart>
  </div>
</template>
<script>
  import LineChart from '../assets/js/LineChart.js'
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
        masterDate: this.$store.state.masterData,
        getData: this.$store.getters.getDate
      }
    },
    
    mounted () {},
    methods: {},
  }
</script>