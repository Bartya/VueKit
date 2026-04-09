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

      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

/* 默认侧边模式 */
.sidebar {
  width: 200px;
  color: #fff;
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
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  height: 60px;
  display: flex;
  align-items: center;
}

/* 内容区 */
.content {
  flex: 1;
  padding: 10px;
  background: #f5f7fa;
}
</style>