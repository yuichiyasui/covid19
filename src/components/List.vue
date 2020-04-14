<template>
  <v-card outlined class="pa-3 mb-4">
    <v-card-text>
      <v-card-title class="title-color">
        感染データ一覧
      </v-card-title>
      <v-simple-table fixed-header height="30vh">
        <template v-slot:default>
          <thead>
            <tr class="table-header-color">
              <th class="text-center">No</th>
              <th class="text-center">年代</th>
              <th class="text-center">性別</th>
              <th class="text-center">確定日</th>
              <th class="text-center">居住都道府県</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d, i) in masterData" :key="i">
              <td class="text-center">{{ d.num }}</td>
              <td class="text-center">{{ d.age }}</td>
              <td class="text-center">{{ d.gender }}</td>
              <td class="text-center">
                {{ $store.getters.dateToString(d.date) }}
              </td>
              <td class="text-center">{{ d.residence }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      masterData: []
    };
  },
  methods: {
    sortByDate: function() {
      var dataArray = this.$store.state.masterData.sort(function(a, b) {
        if (a.date < b.date) {
          return 1;
        } else {
          return -1;
        }
      });
      return dataArray;
    }
  },
  mounted() {
    this.masterData = this.sortByDate();
  }
};
</script>

<style>
.theme--light.v-data-table.v-data-table--fixed-header thead th {
  background-color: #f57c00 !important;
  color: #ffffff !important;
}
</style>
