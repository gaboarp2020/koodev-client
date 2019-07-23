<template>
  <div class="line-chart">
    <line-chart
      v-if="loaded"
      :chart-data="chartData"
      :options="options"
    ></line-chart>
    <div class="text-xs-center" v-if="!loaded">
      <v-progress-circular
      :size="70"
      :width="7"
      color="primary"
      indeterminate
    ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/charts/LineChart'
import PRICE_LOG_QUERY from '@/graphql/ProductsPriceLog.gql'
import PRODUCTS_ID_QUERY from '@/graphql/ProductsId.gql'
export default {
  name: 'ProductsPriceChart',
  components: { LineChart },
  props: {
    symbol: {
      type: String,
      required: true
    }
  },
  apollo: {
    productsPriceLog: {
      query: PRICE_LOG_QUERY,
      update: (data) => data.getAllPricesLogs,
      result ({ data, loading, error }) {
        if (!loading && !error && data) {
          this.chartData = this.buildChartDataSets(data)
          console.log('-------Query process1--------')
          console.log(data)
          console.log('----------------------------')
          this.loaded = true
        }
      },
      error (error) {
        console.error("We've got an error!", error)
      }
    },
    products: {
      query: PRODUCTS_ID_QUERY,
      update: (data) => data.getAllProducts,
      result ({ data, loading, error }) {
        if (!loading && !error && data) {
          console.log('-------Query process2--------')
          console.log(data)
          console.log('----------------------------')
        }
      },
      error (error) {
        console.error("We've got an error!", error)
      }
    }
  },
  data () {
    return {
      productsPriceLog: null,
      products: null,
      numberOfObservations: 0,
      loaded: false,
      chartData: null,
      options: { responsive: true, maintainAspectRatio: false }
    }
  },
  computed: {
    productCount () {
      if (this.products) {
        return this.products.length
      }
      return 0
    },
    numberOfObservationsCount () {
      if (this.productsPriceLog && this.products) {
        return this.productsPriceLog.length / this.products.length + 1
      }
      return 0
    }
  },
  watch: {
    productsPriceLog () {
      this.numberOfObservations = this.numberOfObservationsCount
    }
  },
  methods: {

    buildChartDataSets (data) {
      let priceLogs = data.getAllPricesLogs
      let products = data.getAllProducts
      let productCount = products.length
      let numberOfObservations = priceLogs.length

      let allPrices = []
      let pricesPerProduct = []
      let allDates = []
      let datedPerProduct = []
      let productMatch

      console.log('---------buildChartDataSets----(Pre)----')
      console.log(priceLogs)
      console.log(products)
      console.log(productCount)
      console.log(allPrices)
      console.log(allDates)
      console.log('----------------------------------------')

      for (let i = 0; i < productCount; i++) {
        console.log(i)
        for (let j = 0; j < numberOfObservations; j++) {
          productMatch = priceLogs[j].product.id === products[i].id
          console.log(j)
          console.log(productMatch)
          if (productMatch) {
            pricesPerProduct.push(priceLogs[j].price)

            datedPerProduct.push(new Date(parseInt(priceLogs[j].createdAt, 10)).toDateString())
          }
        }
        pricesPerProduct.unshift(products[i].price)
        datedPerProduct.unshift(new Date(parseInt(products[i].createdAt, 10)).toDateString())

        console.log(`pricesPerProduct: ${pricesPerProduct}`)
        console.log(`datedPerProduct: ${datedPerProduct}`)
        allPrices.push(pricesPerProduct)
        allDates.push(datedPerProduct)
        pricesPerProduct = []
        datedPerProduct = []
      }

      console.log('---------buildChartDataSets----(Post)----')
      console.log(priceLogs)
      console.log(products)
      console.log(productCount)
      console.log(allPrices)
      console.log(allDates)
      console.log('-----------------------------------------')

      let datasets = []
      let productDataset = {}
      let color

      for (let i = 0; i < productCount; i++) {
        color = this.getRandomColor()
        productDataset.backgroundColor = color
        productDataset.borderColor = color
        productDataset.borderWidth = 2
        productDataset.label = `${products[i].name} ${products[i].brand} (${products[i].content} ${products[i].unit})`
        productDataset.fill = false
        productDataset.pointBackgroundColor = color
        productDataset.pointBorderColor = color
        productDataset.data = allPrices[i]
        datasets.push(productDataset)
        productDataset = {}
      }

      console.log('datasets: ')
      console.log(allDates[0])
      console.log(datasets)

      return {
        labels: allDates[0],
        datasets
      }
    },
    getRandomColor () {
      let letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    countProduct () {

    }
  }
}
</script>

<style scoped>
.line-chart {
  padding: 12px;
}
</style>
