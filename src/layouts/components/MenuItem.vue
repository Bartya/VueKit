<script setup lang="ts">
defineProps<{
  item: any
}>()
</script>

<template>
  <!-- 有子菜单 -->
  <el-sub-menu v-if="item.children && item.children.length" :index="item.path">
    <template #title>
      <span>{{ item.name }}</span>
    </template>

    <!-- 🔥 递归调用自己 -->
    <MenuItem
      v-for="child in item.children"
      :key="child.path"
      :item="child"
    />
  </el-sub-menu>

  <!-- 无子菜单 -->
  <el-menu-item v-else :index="item.path">
    {{ item.name }}
  </el-menu-item>
</template>