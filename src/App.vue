<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
	<div class="app">
		<el-config-provider :locale="zhCn">
			<RouterView />
		</el-config-provider>
	</div>
</template>

<style lang="less" scoped>
.app {
	height: 100vh;
	width: 100vw;
}
</style>
