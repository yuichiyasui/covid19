<template>
  <v-card outlined class="pa-3 mb-4">
    <v-card-text class="pa-0">
      <v-card-title class="title-color">
        感染データ一覧
      </v-card-title>
      <div id="list-frame">
        <v-simple-table fixed-header height="50vh" style="min-width:440px;">
          <template v-slot:default>
            <thead>
              <tr class="table-header-color">
                <th class="text-center">確定日</th>
                <th class="text-center">居住都道府県</th>
                <th class="text-center">性別</th>
                <th class="text-center">年代</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(d, i) in masterData" :key="i">
                <td class="text-center">
                  {{ $store.getters.dateToString(d.date) }}
                </td>
                <td class="text-center">{{ d.residence }}</td>
                <td class="text-center">{{ d.gender }}</td>
                <td class="text-center">{{ d.age }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
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
      var dataArray = this.masterData.sort(function(a, b) {
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
    this.masterData = this.$store.state.masterData;
    this.sortByDate();
  }
};
</script>

<style>
.theme--light.v-data-table.v-data-table--fixed-header thead th {
  background-color: #f57c00 !important;
  color: #ffffff !important;
}
#list-frame {
  overflow: auto;
  width:100%;
}
</style>
