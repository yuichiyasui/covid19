<script>
import { Line, mixins } from "vue-chartjs";

export default {
  name: "TransitionDead",
  extends: Line,
  mixins: [mixins.reactiveData],
  data() {
    return {
      date: [],
    };
  },
  computed: {
    //日付
    getDate: function() {
      var dateArray = [];
      this.date.forEach((element) => {
        dateArray.push(this.$store.getters.dateToString(element.date));
      });
      return dateArray;
    },
    //日別の死者数
    getCount: function() {
      var countArray = [];
      this.date.forEach((element) => {
        countArray.push(element.deadCount);
      });
      return countArray;
    },
  },
  //mountのタイミング
  mounted() {
    this.date = this.$store.getters.getDailyChangeData;
    this.renderChart(
      {
        labels: this.getDate,
        datasets: [
          {
            label: "死亡者数",
            data: this.getCount,
            borderColor: "#f57c00",
            backgroundColor: "rgba(255, 130, 3, 0.2)",
            radius: 0,
            hitRadius: 2, // マウスポインタ検出のための円の半径
            borderWidth: 1, // 線の太さ
            tension: 0, // 曲線の滑らかさ
          },
        ],
      },
      { responsive: true, display: true, maintainAspectRatio: false }
    );
  },
  methods: {},
};
</script>
