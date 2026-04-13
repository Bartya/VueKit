<template>
  <div>
    <!-- loading 是由 alova 自动管理的响应式数据 -->
    <div v-if="loading">加载中...</div>
    
    <div v-else >
      <div>你好，{{ user}}</div>
    </div>
    
    <el-button size="small" @click="refresh">刷新数据</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRequest } from 'alova/client';
import { getCode } from '@/api/auth';

// useRequest 会自动调用接口
// data 会自动推断为 UserInfo | undefined
// loading 是 Ref<boolean>
const { data: user, loading, send: refresh } = useRequest(getCode, {
  immediate: true, // 组件挂载时立即请求
  initialData: {}   // 初始数据
});
</script>