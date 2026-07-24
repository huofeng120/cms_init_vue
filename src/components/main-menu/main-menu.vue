<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router'
import { mapRouteToMenuId } from '@/utils/map-memu'
const { userMenus } = defineProps<{
  userMenus: any[],
  isCollapse: boolean
}>()

const emit = defineEmits<{
  routeTip: [url: string]
}>()
function changeRoute(url) {
  emit('routeTip', url)
}
const route = useRoute()
const defaultActive = computed(() => {
  const activeId = mapRouteToMenuId(userMenus, route.path)
  return activeId
})
</script>

<template>
  <div class="main-menu h-[calc(100vh-60px)]  scrollbar-hide overflow-auto">
    <el-menu :default-active="defaultActive + ''" class="el-menu-vertical-demo" :collapse="isCollapse">
      <template v-for="item in userMenus" :key="item.id">
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <el-icon>
              <component :is="item.icon.split('el-icon')[1]"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>

          <template v-for="childItems in item.children" :key="childItems.id">
            <el-menu-item :index="childItems.id + ''" @click="changeRoute(childItems.url)">
              {{ childItems.name }}
            </el-menu-item>
          </template>

        </el-sub-menu>
      </template>

    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.main-menu {
  --el-menu-bg-color: var(--menu-bg-color);
  --el-menu-text-color: var(--menu-text-color);
  --el-menu-active-color: var(--menu-active-color);
  --el-menu-hover-bg-color: var(--menu-hover-bg-color);
  --el-menu-border-color: var(--menu-bg-color);
  --el-menu-icon-width: 15px;

  :deep(.el-menu-item.is-active) {
    background: var(--menu-active-bg-color);
  }
}
</style>