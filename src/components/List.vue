<template>
  <v-card>
    <v-card-text>
      <p class="title">
        感染データ一覧
      </p>
      <v-simple-table fixed-header height="50vh">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">No</th>
              <th class="text-center">年代</th>
              <th class="text-center">性別</th>
              <th class="text-center">確定日</th>
              <th class="text-center">居住都道府県</th>
              <th class="text-center">死者合計</th>
              <th class="text-center">退院数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d, i) in $store.state.masterData" :key="i">
              <td class="text-center">{{ i + 1 }}</td>
              <td class="text-center">{{ d.age }}</td>
              <td class="text-center">{{ d.gender }}</td>
              <td class="text-center">
                {{ $store.getters.dateToString(d.date) }}
              </td>
              <td class="text-center">{{ d.residence }}</td>
              <td class="text-center">{{ d.dead }}</td>
              <td class="text-center">{{ d.discharge }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>