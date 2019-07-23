<template>
  <div>
    <v-data-table
      v-if="loaded"
      :headers="headers"
      :items="products"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>

    <div class="text-xs-center" v-if="!loaded">
      <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
    </div>
  </div>
</template>

<script>
import ALL_PRODUCTS_QUERY from '@/graphql/AllProducts.gql'

export default {
  apollo: {
    getAllProducts: {
      query: ALL_PRODUCTS_QUERY,
      //   update: (data) => data.getAllProducts,
      result ({ data, loading, error }) {
        if (!loading && !error && data) {
          this.products = this.buildDataTable(data)
          console.log('-------Query process1--------')
          console.log(data)
          console.log('----------------------------')
          this.loaded = true
        }
      },
      error (error) {
        console.error("We've got an error!", error)
      }
    }
  },
  data () {
    return {
      name: 'DataTable',
      headers: [
        {
          text: 'Productos',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Marca', value: 'brand' },
        { text: 'Contenido', value: 'content' },
        { text: 'Unidad', value: 'unit' },
        { text: 'Precio (Bs.)', value: 'price' },
        { text: 'Tipo', value: 'type' }
      ],
      products: [],
      loaded: false
    }
  },
  methods: {
    buildDataTable (data) {
      let productsData = data.getAllProducts
      let products = []
      let product = {}

      for (let i = 0; i < productsData.length; i++) {
        product.name = productsData[i].name
        product.brand = productsData[i].brand
        product.content = productsData[i].content
        product.unit = productsData[i].unit
        product.price = productsData[i].price
        product.type = productsData[i].type.name
        products.push(product)
        product = {}
      }

      console.log('Productos: ' + products)

      return products
    }
  }
}
</script>

<style scoped>
</style>
