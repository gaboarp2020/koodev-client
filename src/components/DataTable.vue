<template>
  <v-data-table
    :headers="headers"
    :items="products"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-left">{{ props.item.brand }}</td>
      <td class="text-xs-center">{{ props.item.content }}</td>
      <td class="text-xs-center">{{ props.item.unit }}</td>
      <td class="text-xs-center">{{ props.item.price }}</td>
      <td class="text-xs-left">{{ props.item.type }}</td>
    </template>
  </v-data-table>
</template>

<script>
import ALL_PRODUCTS_QUERY from '@/graphql/AllProducts.gql'

export default {
  apollo: {
    getAllProducts: {
      query: ALL_PRODUCTS_QUERY,
      update: (data) => data.getAllProducts,
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
          text: 'Producto',
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
      console.log('productsData: ' + data.getAllProducts)
      let products = []
      let product = {}

      console.log('Iteraciones: ' + productsData.length)
      for (let i = 0; i < productsData.length; i++) {
        product.name = productsData[i].name
        product.brand = productsData[i].brand
        product.content = productsData[i].content
        product.unit = productsData[i].unit
        product.price = new Intl.NumberFormat('de-DE').format(productsData[i].price)
        product.type = productsData[i].type.name
        products.push(product)
        console.log('product: ' + product)
        product = {}
      }

      console.log('products: ' + products)

      return products
    }
  }
}
</script>

<style scoped>
</style>
