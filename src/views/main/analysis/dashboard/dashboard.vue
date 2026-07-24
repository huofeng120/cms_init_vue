<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useDashboardStore from '@/store/main/analysis/dashboard';
import CountUp from './c-cnps/count-up.vue';
import { LineEcharts } from '@/components/page-echarts'

const dashboardStore = useDashboardStore();
dashboardStore.fetchAmountListData();
const { amountListData } = storeToRefs(dashboardStore);
console.log("amountListData: ", amountListData.value);
</script>

<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="data in amountListData" :key="data.amount">
        <el-col :span="6">
          <el-card>
            <template #header>
              <div class="card-header">
                <p class="text-xs">{{ data.title }}</p>
                <p class="text-2xl font-bold mt-2!">
                  <CountUp :number="data.number1" />
                </p>
              </div>
            </template>
            <div>
              {{ data.subtitle }}:
              <CountUp :number="data.number1" />
            </div>
          </el-card>
        </el-col>

      </template>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="8">
        <line-echarts></line-echarts>
      </el-col>
      <el-col :span="8">
        <line-echarts></line-echarts>
      </el-col>
      <el-col :span="8">
        <line-echarts></line-echarts>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.dashboard {}
</style>