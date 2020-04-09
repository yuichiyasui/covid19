
<script>
  import LineChart from '../assets/js/LineChart.js'

  export default {
    extends: LineChart,
    data () {
      return {
        chartData: []

      }
    },
    computed: {
      getDatas: function(){
        return this.$store.getters.getDatas
      },
      getData: function(){
        //日付
        var date = [];
        return date;
      },
      getCount: function(){
        //日別の感染者数
        var count = [];
        return count;
      }
    },
    mounted () {
      this.renderChart( {
          labels: ["2020/04/01", "2020/04/01", "2020/04/01", "2020/04/01"],
          datasets: [
            {
              label: '感染者数',        
              data: [2, 20, 200, 60]
            }, 
          ]
        },
        { responsive: true, display: true, maintainAspectRatio: false }
      )
    },
    methods: {},
  }
</script>