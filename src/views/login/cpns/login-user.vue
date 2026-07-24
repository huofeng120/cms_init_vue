<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElMessage, type ElForm } from 'element-plus';
import useLoginStore from '@/store/login';
import { useRouter } from 'vue-router';
const formLabelAlign = reactive({
  username: '',
  password: ''
});
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
};

const formRef = ref<InstanceType<typeof ElForm>>();
const loginStore = useLoginStore();
const Router = useRouter();
function handleSubmit() {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      const { username, password } = formLabelAlign;
      try {
        await loginStore.actionAccountLogin({ name: username, password });
        ElMessage.success('登录成功');
        Router.push({ path: '/main' });
      } catch (error) {
        ElMessage.error('登录失败，请检查用户名和密码' + error);
      }

    } else {
      ElMessage.error('表单验证失败，请检查输入');
    }
  });
}
function resetForm() {
  formRef.value?.resetFields();
}
defineExpose({
  resetForm, handleSubmit
});
</script>

<template>
  <div class="login-user">
    <el-form ref="formRef" label-position="left" label-width="auto" :rules="rules" :model="formLabelAlign"
      style="max-width: 600px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="formLabelAlign.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formLabelAlign.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.login-user {}
</style>