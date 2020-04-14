<template>
  <v-col>
    <v-row justify="center" no-gutters align="center">
      <v-col sm="8">
        <p class="display-2 font-weight-thin orange--text text--darken-4">About</p>
        <v-card outlined>
          <v-card-text class="mx-2 mt-2">
            <Description class="mb-9" />
            <Browser class="mb-9" />
            <JavaScript class="mb-9" />
            <DataSource class="mb-9" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
import DataSource from "@/components/about/DataSource";
import Description from "@/components/about/Description";
import Browser from "@/components/about/Browser";
import JavaScript from "@/components/about/JavaScript";
export default {
  components: {
    DataSource,
    Description,
    Browser,
    JavaScript
  }
};
</script>
