<script setup lang="ts">
import { toRefs } from 'vue'
import MainMenu from '@/components/main-menu/main-menu.vue';
import MainHeader from '@/components/main-header/main-header.vue';
import useLoginStore from '@/store/login';
import useHomeStore from '@/store/main'
import { getImgHref } from "@/utils/getImgHref"
import router from "@/router"
const loginStore = useLoginStore()
const { userMenus, userInfo } = toRefs(loginStore)

const homeStore = useHomeStore()
const { isCollapse } = toRefs(homeStore)
function changeCollapse(isCollapse: boolean) {
	homeStore.changeCollapseAction(isCollapse)
}

function changeRoute(url) {
	router.push(url)
}
</script>

<template>
	<div class="home">
		<el-container class="h-full">
			<el-aside :width="isCollapse ? '64px' : '200px'" class="bg-nav transition-all duration-300">
				<div class="flex items-center justify-center w-full text-white h-[60px] overflow-hidden">
					<!-- 折叠时只显示 Logo 图标（假设用你的 SvgIcon） -->
					<img :src="getImgHref('logo.png')" alt="" class="w-[40px]">
					<!-- 展开时显示完整标题 -->
					<h2 v-if="!isCollapse" class="truncate">云无界后台管理</h2>
				</div>
				<MainMenu :user-menus="userMenus" :isCollapse="isCollapse" @route-tip="changeRoute" />
			</el-aside>
			<el-container>
				<el-header class="bg-header">
					<MainHeader :isCollapse="isCollapse" @changeCollapse="changeCollapse" :userInfo="userInfo" />
				</el-header>
				<el-main class="bg-main">
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<style lang="less" scoped>
.home {
	height: 100%;
	width: 100%;
}
</style>
