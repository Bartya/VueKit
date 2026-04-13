<script setup>
import { onMounted } from 'vue'
import { useMenuStore } from '@/stores/modules/menu'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'

const menuStore = useMenuStore()

onMounted(() => {
  menuStore.fetchMenu()
})
</script>

<template>
  <div :class="['layout', menuStore.layoutMode]">
    <!-- Sidebar -->
    <aside class="sidebar">
      <Sidebar />
    </aside>

    <div class="main">
      <header class="header">
        <Header />
      </header>

      <main class="content content-body">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  width: 100vw; /* 明确宽度 */
  overflow: hidden; /* 防止最外层出现滚动条 */
}

/* 默认侧边模式 */
.sidebar {
  width: 200px;
  flex-shrink: 0; /* 🔥 核心改动：禁止侧边栏被挤压收缩 */
  background-color: var(--layout-sidebar-bg); /* 侧边栏底色 */
  transition: all 0.3s;
}

/* 🔥 top 模式：收缩 Sidebar */
.layout.top .sidebar {
  width: 0;
  overflow: hidden;
}

/* 主区域 */
.main {
  flex: 1;
  min-width: 0;  /* 🔥 必须有 */
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  height: 60px;
  flex-shrink: 0; /* 防止头部被挤扁 */
  display: flex;
  align-items: center;
}

/* 内容区 */
.content {
  flex: 1;
  padding: 10px;
  background: var(--layout-bg);
  color: var(--content-text-color);
  
  /* 1. 物理限宽：确保 content 永远不会超过父元素（.main）分配给它的空间 */
  width: 100%; 
  box-sizing: border-box; /* 确保 padding 不会额外增加宽度 */

  /* 2. 关键：强制长字符串折行 */
  /* 不要注释掉这行！它是解决 Base64 挤飞的唯一解 */
  word-break: break-all; 

  /* 3. 滚动条控制 */
  overflow-y: auto;   /* 竖向内容多了就出滚动条 */
  overflow-x: auto;
  /*  🔥 明确禁止横向滚动条，这才是“物理限制” */
}
.content * {
  max-width: 100%;
  box-sizing: border-box;
}
.my-sidebar {
  /* 使用我们在 Store 中定义的 CSS 变量 */
  background-color: var(--layout-sider-bg);
  color: var(--layout-text-color);
  transition: all 0.3s; /* 平滑切换过渡 */
}
</style>
