<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useConfigStore } from '@/stores/modules/useConfigStore.ts'

const configStore = useConfigStore()
onBeforeMount(() => {
  configStore.initConfig() // 页面刷新时从本地存储恢复字号
})
</script>
<template>
  <router-view />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>