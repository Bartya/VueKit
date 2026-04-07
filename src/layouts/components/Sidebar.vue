<script setup>
import { useMenuStore } from '@/stores/modules/menu'
import MenuItem from './MenuItem.vue'

const menuStore = useMenuStore()
</script>

<template>
  <el-menu
    router
    :default-active="$route.path"
    background-color="#2f3542"
    text-color="#fff"
    active-text-color="#409EFF"
  >
    <!-- 🔥 只需要一层循环 -->
    <MenuItem
      v-for="item in menuStore.menuList"
      :key="item.path"
      :item="item"
    />
  </el-menu>
</template>