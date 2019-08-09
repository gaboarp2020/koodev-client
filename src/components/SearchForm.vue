<template>
      <v-container>
        <v-form class="mb-5">
        <div class="input-group">
            <v-text-field
            v-model="searchString"
            @keydown.13.prevent="parseSearchString"
            type="text"
            class="form-control"
            placeholder="Search ..."
            ></v-text-field>
                <v-btn @click="parseSearchString"  outline color="primary" type="button">
                    buscar
                    <i class="fas fa-search"></i>
                </v-btn>
        </div>
        </v-form>
    </v-container>
</template>

<script>
export default {
  name: 'SearchForm',
  data () {
    return {
      searchString: ''
    }
  },
  methods: {
    parseSearchString () {
      // Trim search string
      const trimmedSearchString = this.searchString.trim()

      if (trimmedSearchString !== '') {
        // Split search string
        const searchParams = trimmedSearchString.split(/\s+/)
        // Emit event
        this.$emit('search', searchParams)
        // Reset input field
        this.searchString = ''
      }
    }
  }
}
</script>

<style scoped>
input,
button {
  box-shadow: none !important;
}

.form-control {
  border-color: #6c757d;
}
</style>
