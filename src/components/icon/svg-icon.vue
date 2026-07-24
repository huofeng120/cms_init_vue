<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true
  }
});

</script>

<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.icon :deep(svg),
.icon :deep(path),
.icon :deep(circle),
.icon :deep(rect),
.icon :deep(ellipse) {
  fill: currentColor !important;
  stroke: currentColor !important;
}
</style>