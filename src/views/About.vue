<template>
  <v-col>
    <v-card height="80vh" class="pa-3">
      <v-card-text>
        <p class="display-1">This is an about page</p>
        <p>
          日本国内における新型コロナウイルス感染症
          (COVID-19)に関する情報サイトです。
        </p>

        <DataSource />
      </v-card-text>
    </v-card>
  </v-col>
</template>
<script>
import DataSource from "@/components/about/DataSource";
export default {
  components: {
    DataSource
  }
};
</script>
