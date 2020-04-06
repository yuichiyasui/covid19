<template>
  <div>
    <h1>graph</h1>
    <p>{{ masterData }}</p>
  </div>
</template>

<script>
  export default {
    name: 'TransitionGraph',
    data(){
      return{
      masterData: this.$store.state.masterData
      }
    }
  }
</script>
