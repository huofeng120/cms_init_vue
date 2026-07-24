<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from "./c-cpns/header-info.vue"
import HeaderCrumb from './c-cpns/header-crumb.vue';
const { isCollapse } = defineProps<{
  isCollapse: boolean,
  userInfo: any
}>()

const _isCollapse = ref(isCollapse)

const emit = defineEmits<{
  changeCollapse: [isCollapse: boolean]
}>()
function changeCollapse() {
  _isCollapse.value = !_isCollapse.value
  emit('changeCollapse', _isCollapse.value)
}

</script>

<template>
  <div class="main-header flex items-center h-full">
    <div @click="changeCollapse" class="cursor-pointer !mr-2">
      <el-icon size="30">
        <component :is="isCollapse ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="flex justify-between flex-1">
      <HeaderCrumb />
      <div class="flex space-x-2 ">
        <HeaderInfo :userInfo="userInfo" />
      </div> 
    </div>
  </div>
</template>

<style lang="less" scoped></style>