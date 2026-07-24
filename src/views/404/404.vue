<script setup lang="ts">
import { getImgHref } from '@/utils/getImgHref';
</script>

<template>
	<el-result title="404" sub-title="资源不存在">
		<template #icon>
			<el-image :src="getImgHref('404.webp')" fit="contain" />
		</template>
	</el-result>
</template>

<style lang="less" scoped></style>
