<script setup lang="ts">
import BaseEcharts from "./base-echarts.vue";
const configOption = {
  title: {
    text: "折线图",
  },
  tooltip: {},
  legend: {
    data: ["销量"],
  },
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺", "裤子", "高跟鞋", "袜子"],
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "line",
      smooth: true,
      data: [11, 11
        , 15, 13, 12, 13],
    },
  ],
}
</script>

<template>
  <div class="line-echarts">
    <BaseEcharts :config-options="configOption" />
  </div>
</template>

<style lang="less" scoped>
.line-echarts {}
</style>