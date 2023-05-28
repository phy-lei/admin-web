<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
const props = defineProps({
  iconClass: {
    type: String,
    required: true,
  },
  className: {
    type: String,
  },
});

const iconName = computed(() => `#icon-${props.iconClass}`);

const svgClass = computed(() =>
  props.className ? 'svg-icon ' + props.className : 'svg-icon'
);
</script>

<style scoped>
.svg-icon {
  width: 1.2em;
  height: 1.2em;
  vertical-align: -0.18em;
  fill: currentColor;
  overflow: hidden;
}
</style>
