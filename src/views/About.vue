<template>
  <v-col>
    <v-row justify="center" no-gutters align="center">
      <v-col offset-md="2" md="8">
        <p class="display-1">当サイトについて</p>
        <Description />
        <DataSource />
      </v-col>
    </v-row>
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
