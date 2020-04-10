<script>
  import LineChart from '../assets/js/LineChart.js'

  export default {
    name: "TransitionDead",
    extends: LineChart,
    data () {
      return {
        date: []
      };
    },
    //method
    computed: {
        //日付
      getDate: function(){
        const dateArray = this.$store.getters.getDeadTransition.map(item => item.date.toLocaleDateString())
         
        
        return dateArray;
      },
        //日別の死者数
      getNumber: function(){
          const deadArray = this.$store.getters.getDeadTransition.map(item => item.dead)
        
    
        return deadArray;
      }
    },
    //mountのタイミング
    mounted () {
      this.date = this.$store.getters.getDeadTransitions;
      this.renderChart( {
          labels: this.getDate,
          datasets: [
            {
              label: '死亡者数',        
              data: this.getNumber,
               borderColor:"#f57c00",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            
            radius: 3
            }, 
          ]
        },
        { responsive: true, display: true, maintainAspectRatio: false }
      )
    },
    methods: {},
  }
</script>