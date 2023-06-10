<template>
  <product-attr-detail :is-edit='true'></product-attr-detail>
</template>

<script lang="ts" setup>
import ProductAttrDetail from './components/ProductAttrDetail'
export default {
  name: 'updateProductAttr',
  components: { ProductAttrDetail }
}
</script>

<style scoped></style>
