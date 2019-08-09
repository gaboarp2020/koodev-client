<template>
  <div>
    <div v-if="products">
      <v-data-table :headers="headers" :items="products" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.brand }}</td>
          <td class="text-xs-left">{{ props.item.content }}</td>
          <td class="text-xs-left">{{ props.item.unit }}</td>
          <td class="text-xs-left">{{ props.item.price }}</td>
          <td class="text-xs-left">{{ props.item.type }}</td>
        </template>
      </v-data-table>
    </div>
    <div class="text-xs-center" v-if="!products">
      <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      name: 'ApiYoutube',
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
      products: null,

      nextPageToken: '',
      // Resultados por pagina
      resPorPagina: 5,
      // Paginas a mostrar
      paginas: 1,
      key: 'AIzaSyBoC4Fysg7q4tiCMOneHtwMbZzuvTTY4io',
      idCanal: 'UCekiUWTObDKZnaeS-reYQbg',
      url:
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCekiUWTObDKZnaeS-reYQbg&key=AIzaSyBoC4Fysg7q4tiCMOneHtwMbZzuvTTY4io`,
      loaded: false
    }
  },
  methods: {
    // buildDataTable (data) {
    //   let productsData = data.getAllProducts
    //   console.log('productsData: ' + data.getAllProducts)
    //   let products = []
    //   let product = {}
    //   console.log('Iteraciones: ' + productsData.length)
    //   for (let i = 0; i < productsData.length; i++) {
    //     product.name = productsData[i].name
    //     product.brand = productsData[i].brand
    //     product.content = productsData[i].content
    //     product.unit = productsData[i].unit
    //     product.price = new Intl.NumberFormat('de-DE').format(productsData[i].price)
    //     product.type = productsData[i].type.name
    //     products.push(product)
    //     console.log('product: ' + product)
    //     product = {}
    //   }
    //   console.log('products: ' + products)
    //   return products
    // }
  },
  mounted () {
    $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCekiUWTObDKZnaeS-reYQbg&key=AIzaSyBoC4Fysg7q4tiCMOneHtwMbZzuvTTY4io', json => {
      // this.products = json.data
      console.log(json.data)
    })
  }
}
</script>

<style scoped>
</style>
