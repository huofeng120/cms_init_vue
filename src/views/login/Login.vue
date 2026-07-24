<script setup lang="ts">
import LoginPanel from './cpns/login-panel.vue';
</script>

<template>
	<div class="login flex justify-center items-center">
		<LoginPanel />
	</div>
</template>

<style lang="less" scoped>
.login {
	height: 100%;
	width: 100%;
	overflow: hidden;
	background-color: #f5f5f5;
}
</style>
