<template>
  <div class="home">
    <v-app class="inspire">
      <v-container>
        <v-card>
          <v-card-title primary-title>
            <h1 class="headline">{{ chartTitle }}</h1>
          </v-card-title>
          <products-price-chart :symbol="chartTitle"></products-price-chart>
        </v-card>
        <v-card>
          <v-card-title primary-title>
            <h1 class="headline">{{ tableTitle }}</h1>
          </v-card-title>
          <data-table></data-table>
        </v-card>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import ProductsPriceChart from '@/components/ProductsPriceChart.vue'
import DataTable from '@/components/DataTable.vue'
export default {
  name: 'home',
  data () {
    return {
      chartTitle: 'Evolución de Precios de los Productos (Bs.)',
      tableTitle: 'Información de los Productos'
    }
  },
  components: {
    ProductsPriceChart,
    DataTable
  }
}
</script>
