<script setup lang="ts">
import { ref, onMounted, onBeforeMount, watchEffect } from 'vue'
import * as echarts from 'echarts';
const echartsRef = ref<HTMLElement | null>(null)

const { configOptions } = defineProps<{
  configOptions: any
}>()

let myChart: echarts.ECharts | null = null;
function resize() {
  myChart?.resize()
}
onMounted(() => {
  myChart = echarts.init(echartsRef.value!, 'light', {
    renderer: 'canvas'
  });
  watchEffect(() => {
    myChart?.setOption(configOptions);
  })

  window.addEventListener('resize', resize);
})

onBeforeMount(() => {
  myChart?.dispose();
  window.removeEventListener('resize', resize);
})
</script>

<template>
  <div class="base-echarts" ref="echartsRef">

  </div>
</template>

<style lang="less" scoped>
.base-echarts {
  height: 200px;
}
</style>