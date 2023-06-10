<template>
  <product-cate-detail :is-edit='false'></product-cate-detail>
</template>
<script lang="ts" setup>
import ProductCateDetail from './components/ProductCateDetail'
export default {
  name: 'addProductCate',
  components: { ProductCateDetail }
}
</script>
<style></style>


