<script setup lang="ts">
import { ref } from 'vue';
import LoginIphone from './login-iphone.vue';
import LoginUser from './login-user.vue';
const activeName = ref('account');

const isRememberPassword = ref(true);

const accountTab = ref<InstanceType<typeof LoginUser> | null>();
const phoneTab = ref<InstanceType<typeof LoginIphone> | null>();



function handleSubmit() {
  if (activeName.value === 'account') {
    accountTab.value?.handleSubmit();
  } else if (activeName.value === 'phone') {
    phoneTab.value?.handleSubmit();
  }
}
</script>

<template>
  <div class="login-panel">
    <h1 class="title text-center">后台管理系统</h1>
    <el-tabs stretch v-model="activeName" type="border-card" class="demo-tabs">
      <el-tab-pane name="account">
        <template #label>
          <span class="flex space-x-2 items-center">
            <SvgIcon name="icon-yonghu" />
            <span>账号登录</span>
          </span>
        </template>
        <LoginUser ref="accountTab" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="flex space-x-2 items-center">
            <SvgIcon name="icon-shouji2" />
            <span>手机登录</span>
          </span>
        </template>
        <LoginIphone ref="phoneTab" />
      </el-tab-pane>
    </el-tabs>
    <div class="flex justify-between items-center">
      <el-checkbox v-model="isRememberPassword" label="记住密码" size="large" />
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
    <div class="flex justify-center mt-4">
      <el-button type="primary" class="w-full" @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-panel {
  width: 330px;
}
</style>