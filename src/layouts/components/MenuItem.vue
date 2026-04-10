<!-- MenuItem.vue -->
<script setup lang="ts">
defineProps<{ item: any }>()
</script>

<template>
  <el-sub-menu
    v-if="item.children && item.children.length"
    :index="item.path"
    popper-class="theme-menu-popper" 
  >
    <!-- ^^^ 关键点：一定要加这个类名 -->
    <template #title>
      <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
      <span>{{ item.name }}</span>
    </template>
    <MenuItem v-for="child in item.children" :key="child.path" :item="child" />
  </el-sub-menu>

  <el-menu-item v-else :index="item.path">
    <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
    <template #title>{{ item.name }}</template>
  </el-menu-item>
</template>