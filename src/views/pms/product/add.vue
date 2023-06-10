<template>
  <product-detail :is-edit='false'></product-detail>
</template>
<script lang="ts" setup>
import ProductDetail from './components/ProductDetail'
export default {
  name: 'addProduct',
  components: { ProductDetail }
}
</script>
<style></style>
