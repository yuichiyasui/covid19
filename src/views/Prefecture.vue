<template>
  <div class="prefecture">
    <div class="mt-12">
      <IndividualPrefectureGraph />
    </div>
  </div>
</template>
<script>
import IndividualPrefectureGraph from '@/components/IndividualPrefectureGraph.vue'
export default {
    components: {
      IndividualPrefectureGraph
    }
}
</script>