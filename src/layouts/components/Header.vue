<script setup lang="ts">
import { computed } from 'vue'
import { useMenuStore } from '@/stores/modules/menu'
import MenuItem from './MenuItem.vue'
import { useRoute, useRouter } from 'vue-router'
import { Setting } from '@element-plus/icons-vue' // 引入一个设置图标
const menuStore = useMenuStore()
const route = useRoute()

// 控制字号弹窗显示
const fontSizeDrawerVisible = ref(false)
// --- 菜单展示逻辑 ---
// 逻辑：前 8 个菜单正常展示
const visibleMenus = computed(() => menuStore.menuList.slice(0, 8))
// 逻辑：多于 8 个的部分
const hiddenMenus = computed(() => menuStore.menuList.slice(8))

const handleLogout = () => {
  console.log('退出登录')
}
</script>

<template>
  <!-- 整个 Header 容器 -->
  <header class="header-wrapper" :class="{ 'is-top-layout': menuStore.layoutMode === 'top' }">
    <div class="header-content">
      
      <!-- 1. 左侧：Logo 区域 -->
      <div class="left-box"   v-if="menuStore.layoutMode === 'top'">
        <div class="logo">
          <div class="logo-circle"><img src="@/assets/icon/icon.jpg" alt=""></div>
          <span class="logo-title">Vue Kit</span>
        </div>
      </div>

      <!-- 2. 中间：菜单区域 (仅在 top 模式显示) -->
      <div class="center-box">
        <el-menu
          v-if="menuStore.layoutMode === 'top'"
          mode="horizontal"
          :default-active="route.path"
          router
          :ellipsis="false"
          class="nav-menu"
        >
          <!-- 前 8 个 -->
          <MenuItem
            v-for="item in visibleMenus"
            :key="item.path"
            :item="item"
          />

          <!-- 如果超过 8 个，显示“更多” -->
          <el-sub-menu v-if="hiddenMenus.length > 0" index="more-items">
            <template #title>更多</template>
            <MenuItem
              v-for="item in hiddenMenus"
              :key="item.path"
              :item="item"
            />
          </el-sub-menu>
        </el-menu>
        
        <!-- 非顶部布局时，这里可以放面包屑或留空 -->
        <div v-else class="breadcrumb-mock">
          <!-- 工作台 / 仪表盘 -->
        </div>
      </div>

      <!-- 3. 右侧：操作区域 -->
      <div class="right-box">
         <div class="action-items">
          <!-- 字体设置按钮 -->
          <el-tooltip content="界面设置" placement="bottom">
            <el-button 
              circle 
              :icon="Setting" 
              @click="fontSizeDrawerVisible = true" 
            />
          </el-tooltip>

          <el-button size="small" round @click="menuStore.toggleLayout()">
             {{ menuStore.layoutMode === 'top' ? '切换侧边菜单' : '切换顶部菜单' }}
          </el-button>
        </div>

        <el-dropdown trigger="click">
          <div class="user-info">
            <el-avatar :size="32" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
            <span class="username">Admin</span>
            <el-icon><arrow-down /></el-icon>
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
       <FontSizeDrawer v-model="fontSizeDrawerVisible" />
    </div>
  </header>
</template>

<style scoped>
/* 
  最外层容器：
  使用深靛蓝背景，宽度 100%，消除白色边框感
*/
.header-wrapper {
  width: 100%;
  height: 60px;
  background-color: #262f3e; /* 高级深靛蓝 */
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); */
  position: relative;
  z-index: 1000;
  color: #ffffff;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 24px;
}

/* 左侧 Logo 区域 */
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
  background: #3b82f6; /* 鲜艳的品牌蓝 */
  color: #fff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.5);
  img {
    width: 32px;
    height: 32px;
  }
}

.logo-title {
  font-size: 19px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #ffffff; /* 纯白文字 */
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
  background-color: transparent !important; /* 必须透明 */
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}

/* 顶部水平菜单项样式覆盖 */
:deep(.el-menu--horizontal > .el-menu-item) {
  height: 60px;
  line-height: 60px;
  border-bottom: none !important; /* 移除底部线条 */
  color: #a0a5ba !important; /* 未激活时的淡蓝灰 */
  padding: 0 20px;
  transition: all 0.3s;
}

/* 顶部菜单 Hover 状态 */
:deep(.el-menu--horizontal > .el-menu-item:hover) {
  background-color: #313a4d !important;
  color: #ffffff !important;
}

/* 顶部菜单 激活 状态 (Active) */
:deep(.el-menu--horizontal > .el-menu-item.is-active) {
  color: #ffffff !important;
  background-color: #3b82f6 !important; /* 激活时使用明显的色块 */
  font-weight: 600;
}

/* 顶部 Submenu (更多) 样式微调 */
:deep(.el-sub-menu__title) {
  color: #a0a5ba !important;
  border-bottom: none !important;
}
:deep(.el-sub-menu:hover .el-sub-menu__title) {
  background-color: #313a4d !important;
  color: #ffffff !important;
}

/* 右侧操作区 */
.right-box {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 15px;
  min-width: 200px;
  justify-content: flex-end;
}

/* 切换按钮：半透明样式 */
:deep(.el-button--small) {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: #fff !important;
}
:deep(.el-button--small:hover) {
  background: rgba(255, 255, 255, 0.2) !important;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background 0.3s;
}
.user-info:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.username {
  font-size: 14px;
  color: #ffffff;
  font-weight: 500;
}

:deep(.el-icon) {
  color: #a0a5ba;
}

/* 移除 Element 默认聚焦框 */
:deep(.el-tooltip__trigger:focus-visible) {
  outline: unset;
}
/* 针对新加的按钮稍微微调 */
.action-items {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 按钮样式覆盖，使其匹配你的深色 Header */
:deep(.el-button.is-circle) {
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
  color: #fff !important;
}
:deep(.el-button.is-circle:hover) {
  background: rgba(255, 255, 255, 0.2) !important;
}
</style>