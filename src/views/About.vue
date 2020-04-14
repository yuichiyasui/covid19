<template>
  <v-col>
    <p class="display-1">当サイトについて</p>
    <Description />
    <DataSource />
  </v-col>
</template>
<script>
import DataSource from "@/components/about/DataSource";
import Description from "@/components/about/Description";
export default {
  components: {
    DataSource,
    Description
  }
};
</script>
