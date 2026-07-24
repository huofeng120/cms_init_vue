<script setup lang="ts">
import { getImgHref } from '@/utils/getImgHref';
const { userInfo } = defineProps<{
  userInfo: any
}>()
</script>

<template>
  <div class="header-info">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link flex items-center gap-1 cursor-pointer">
        <el-avatar :size="20" :src="getImgHref('logo.png')" />
        <span>{{ userInfo.name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-icon>
              <SwitchButton />
            </el-icon>
            <span>退出登录</span>
          </el-dropdown-item>
          <el-dropdown-item>

            <el-icon>
              <Avatar />
            </el-icon>
            <span>个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon>
              <Edit />
            </el-icon>
            <span>修改密码</span>
          </el-dropdown-item>

        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="less" scoped>
.header-info {}
</style>