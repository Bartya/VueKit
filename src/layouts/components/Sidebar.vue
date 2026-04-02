<script setup>
import { useMenuStore } from '@/stores/modules/menu'

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
    <template v-for="item in menuStore.menuList" :key="item.path">
      <!-- 有子菜单 -->
      <el-sub-menu v-if="item.children?.length" :index="item.path">
        <template #title>{{ item.name }}</template>

        <el-menu-item
          v-for="child in item.children"
          :key="child.path"
          :index="child.path"
        >
          {{ child.name }}
        </el-menu-item>
      </el-sub-menu>

      <!-- 无子菜单 -->
      <el-menu-item v-else :index="item.path">
        {{ item.name }}
      </el-menu-item>
    </template>
  </el-menu>
</template>