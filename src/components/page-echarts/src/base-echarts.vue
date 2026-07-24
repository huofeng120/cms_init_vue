<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts';
const echartsRef = ref<HTMLElement | null>(null)
onMounted(() => {
  const myChart = echarts.init(echartsRef.value!, 'light', {
    renderer: 'canvas'
  });
  myChart.setOption({})
})
</script>

<template>
  <div class="base-echarts" ref="echartsRef">

  </div>
</template>

<style lang="less" scoped>
.base-echarts {}
</style>