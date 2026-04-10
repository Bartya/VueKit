<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMenuStore } from '@/stores/modules/menu'
import { useConfigStore } from '@/stores/modules/useConfigStore'
import MenuItem from './MenuItem.vue'
import { useRoute } from 'vue-router'
import { Setting, ArrowDown } from '@element-plus/icons-vue'

const menuStore = useMenuStore()
const configStore = useConfigStore()
const route = useRoute()

// 控制设置抽屉显示
const fontSizeDrawerVisible = ref(false)

// --- 菜单展示逻辑 ---
const visibleMenus = computed(() => menuStore.menuList.slice(0, 8))
const hiddenMenus = computed(() => menuStore.menuList.slice(8))

const handleLogout = () => {
  console.log('退出登录')
}
</script>

<template>
  <header class="header-wrapper">
    <div class="header-content">
      <!-- 1. 左侧：Logo 区域 (仅在顶部菜单模式显示) -->
      <div class="left-box" v-if="menuStore.layoutMode === 'top'">
        <div class="logo">
          <div class="logo-circle">
            <img src="@/assets/icon/icon.jpg" alt="logo" />
          </div>
          <span class="logo-title">Vue Kit</span>
        </div>
      </div>

      <!-- 2. 中间：菜单区域 -->
      <div class="center-box">
        <el-menu
          v-if="menuStore.layoutMode === 'top'"
          mode="horizontal"
          :default-active="route.path"
          router
          :ellipsis="false"
          class="nav-menu"
        >
          <MenuItem v-for="item in visibleMenus" :key="item.path" :item="item" />

          <el-sub-menu
            v-if="hiddenMenus.length > 0"
            index="more-items"
            popper-class="theme-menu-popper"
          >
            <template #title>更多</template>
            <MenuItem v-for="item in hiddenMenus" :key="item.path" :item="item" />
          </el-sub-menu>
        </el-menu>

        <!-- 非顶部布局时显示面包屑或空 -->
        <div v-else class="breadcrumb-mock">
          <!-- 这里可以放置面包屑组件 -->
        </div>
      </div>

      <!-- 3. 右侧：操作区域 -->
      <div class="right-box">
        <div class="action-items">
          <!-- 界面设置按钮 -->
          <el-tooltip content="界面设置" placement="bottom">
            <el-button circle :icon="Setting" @click="fontSizeDrawerVisible = true" />
          </el-tooltip>

          <!-- 布局切换按钮 -->
          <el-button size="small" round @click="menuStore.toggleLayout()">
            {{ menuStore.layoutMode === 'top' ? '侧边模式' : '顶部模式' }}
          </el-button>
        </div>

        <!-- 用户头像信息 -->
        <el-dropdown trigger="click">
          <div class="user-info">
            <el-avatar :size="32" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
            <span class="username">Admin</span>
            <el-icon class="arrow-icon"><arrow-down /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <!-- 设置抽屉组件 -->
      <FontSizeDrawer v-model="fontSizeDrawerVisible" />
    </div>
  </header>
</template>

<style scoped>
.header-wrapper {
  width: 100%;
  height: 60px;
  /* 使用 Store 注入的全局变量 */
  background-color: var(--layout-header-bg);
  color: var(--layout-text-color);
  border-bottom: 1px solid var(--header-btn-border);
  position: relative;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 24px;
}

/* Logo 样式 */
.left-box {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  min-width: 180px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.logo-circle {
  width: 32px;
  height: 32px;
  background: var(--el-color-primary);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
}
.logo-circle img {
  width: 32px;
  height: 32px;
  border-radius: 6px;
}
.logo-title {
  font-size: 19px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--layout-text-color);
}

/* 中间菜单区域 */
.center-box {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding: 0 40px;
}
.nav-menu {
  border-bottom: none !important;
  background-color: transparent !important;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}

/* 菜单 Hover & Active 状态 */
:deep(.el-menu--horizontal > .el-menu-item:hover),
:deep(.el-menu--horizontal > .el-sub-menu:hover .el-sub-menu__title) {
  background-color: var(--header-btn-bg) !important;
  opacity: 1;
}
:deep(.el-menu--horizontal > .el-sub-menu .el-sub-menu__title) {
  color: var(--layout-text-color) !important;
}
:deep(.el-menu--horizontal > .el-menu-item.is-active) {
  color: var(--el-color-primary) !important;
  background-color: var(--layout-menu-active-bg) !important;
  opacity: 1;
  font-weight: 600;
}

/* 右侧操作区 */
.right-box {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 20px;
  min-width: 200px;
  justify-content: flex-end;
}

.action-items {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 核心：动态按钮样式 (磨砂透明感) */
:deep(.el-button--small),
:deep(.el-button.is-circle) {
  background-color: var(--header-btn-bg) !important;
  border: 1px solid var(--header-btn-border) !important;
  color: var(--layout-text-color) !important;
  transition: all 0.3s;
}

:deep(.el-button:hover) {
  background-color: var(--header-btn-border) !important;
}

/* 用户信息 */
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 5px 8px;
  border-radius: 6px;
  transition: background 0.3s;
}
.user-info:hover {
  background-color: var(--header-btn-bg);
}
.username {
  font-size: 14px;
  color: var(--layout-text-color);
  font-weight: 500;
}
.arrow-icon {
  color: var(--layout-text-color);
  opacity: 0.7;
  font-size: 12px;
}
</style>
