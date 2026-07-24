<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CountUp } from 'countup.js';
const { number = 0 } = defineProps<{ number: number }>()

const countUpRef = ref<HTMLElement>()
onMounted(() => {
  const countUp = new CountUp(countUpRef.value!, number)
  if (!countUp.error) {
    countUp.start()
  }
})



</script>

<template>
  <div class="count-up" ref="countUpRef">
    {{ number }}
  </div>
</template>

<style lang="less" scoped>
.count-up {}
</style>