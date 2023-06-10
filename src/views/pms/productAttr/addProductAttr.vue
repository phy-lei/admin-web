<template>
  <product-attr-detail :is-edit='false'></product-attr-detail>
</template>

<script lang="ts" setup>
import ProductAttrDetail from './components/ProductAttrDetail'
export default {
  name: 'addProductAttr',
  components: { ProductAttrDetail }
}
</script>

<style scoped></style>
