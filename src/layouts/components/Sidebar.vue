<script setup>
import { useMenuStore } from '@/stores/modules/menu'
import MenuItem from './MenuItem.vue'
import { useRoute } from 'vue-router'

const menuStore = useMenuStore()
const route = useRoute()
</script>

<template>
  <div class="sidebar-container">
    <!-- 1. 侧边模式顶部的 Logo 区域 -->
    <div class="sidebar-logo">
      <div class="logo-circle"><img src="@/assets/icon/icon.jpg" alt="" /></div>
      <span class="logo-text">Vue Kit</span>
    </div>
    <el-scrollbar class="menu-scrollbar">
      <el-menu
        router
        :default-active="route.path"
        :collapse="menuStore.isCollapse"
        :unique-opened="true"
        :collapse-transition="false"
        class="custom-side-menu"
      >
        <MenuItem v-for="item in menuStore.menuList" :key="item.path" :item="item" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped>
/* 侧边栏整体背景：与 Header 呼应 */
.sidebar-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--layout-sidebar-bg); /* 使用变量 */
  /* 与 Header 保持一致 */
  transition: width 0.3s;
  border-right: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.menu-scrollbar {
  flex: 1;
}

/* 移除菜单右侧边框 */
.custom-side-menu {
  border-right: none !important;
  background-color: transparent !important;
}

/* 1. 基础菜单项样式：通栏（无 margin） */
:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  height: 50px !important;
  line-height: 50px !important;
  margin: 0 !important;
  /* 彻底移除悬浮岛 */
  color: var(--layout-text-color) !important;
  /* 未激活文字颜色 */
  padding-left: 20px !important;
  transition: all 0.3s ease;
}

/* 2. 鼠标悬停态 (Hover) */
:deep(.el-menu-item:hover),
:deep(.el-sub-menu__title:hover) {
  color: var(--el-menu-hover-text-color) !important;
  background-color: var(--layout-menu-active-bg) !important;
  /* 比背景稍亮一点 */
}

/* 3. 激活态样式 (Selected) */
:deep(.el-menu-item.is-active) {
  background-color: #1e2531 !important;
  /* 激活时背景变深，突出文字 */
  color: #3b82f6 !important;
  /* 激活文字使用蓝色 */
  font-weight: 600;
  position: relative;
}

/* 4. 激活态左侧指示条 */
:deep(.el-menu-item.is-active::before) {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: #3b82f6;
  box-shadow: 2px 0 8px rgba(59, 130, 246, 0.5);
}

/* 侧边栏 Logo 样式 */
.sidebar-logo {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  transition: width 0.3s ease; /* 菜单的宽度变化添加过渡 */
  gap: 12px;
  background-color: var(--layout-sidebar-bg); /* 使用变量 */
  overflow: hidden;
}

.logo-circle {
  flex-shrink: 0;

  img {
    width: 32px;
    height: 32px;
  }

  background: #3b82f6;
  color: #fff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.5);
}

.logo-text {
  color: var(--layout-text-color);
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
}

/* 5. 子菜单展开后的背景 (体现层级) */
:deep(.el-menu--inline) {
  background-color: var(--layout-menu-active-bg) !important;
  /* 展开部分颜色加深 */
}

/* 6. 图标样式同步 */
:deep(.el-menu-item .el-icon),
:deep(.el-sub-menu__title .el-icon) {
  color: #8c92a4;
  margin-right: 12px;
  font-size: 18px;
}

:deep(.el-menu-item.is-active .el-icon) {
  background-color: var(--layout-menu-active-bg) !important;
  color: var(--el-color-primary) !important;
}
/* 7. 菜单折叠状态下的图标居中 */
.el-menu--collapse :deep(.el-menu-item) {
  display: flex;
  justify-content: center;
  padding: 0 !important;
}

/* 8. 修复折叠状态下子菜单标题 */
.el-menu--collapse :deep(.el-sub-menu__title) {
  justify-content: center;
  padding: 0 !important;
}
</style>
