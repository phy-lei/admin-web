<template>
  <product-cate-detail :is-edit='true'></product-cate-detail>
</template>
<script lang="ts" setup>
import ProductCateDetail from './components/ProductCateDetail'
export default {
  name: 'updateProductCate',
  components: { ProductCateDetail }
}
</script>
<style></style>


