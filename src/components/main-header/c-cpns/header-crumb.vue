<script setup lang="ts">
import { useRoute } from "vue-router";
import { mapMenuToCrumb } from "@/utils/map-memu"
import { computed } from "vue";
import useLoginStore from "@/store/login";
const route = useRoute()
const loginStore = useLoginStore()
const breadCrumbs = computed(() => {
  return mapMenuToCrumb(route.path, loginStore.userMenus)
})

</script>

<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item of breadCrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<style lang="less" scoped>
.header-crumb {}
</style>