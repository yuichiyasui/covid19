<template>
  <div class="home">
    <router-link to="/about">ABOUT</router-link>
    <JapanMap />
  </div>
</template>

<script>
// @ is an alias to /src
import JapanMap from '@/components/JapanMap.vue'

export default {
  name: 'Home',
  components: {
    JapanMap
  }
}
</script>
