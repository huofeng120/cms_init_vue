<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElMessage, type ElForm } from 'element-plus';
const formLabelAlign = reactive({
  phone: '',
  code: ''
});
const rules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: 'blur' }
  ]
};
const formRef = ref<InstanceType<typeof ElForm>>();
function handleSubmit() {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log('提交表单', formLabelAlign);
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
  <div class="login-iphone">
    <el-form label-position="left" label-width="auto" :rules="rules" :model="formLabelAlign" style="max-width: 600px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formLabelAlign.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="formLabelAlign.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.login-iphone {}
</style>