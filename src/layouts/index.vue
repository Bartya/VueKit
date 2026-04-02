<script setup>
import { useMenuStore } from '@/stores/modules/menu'
import Sidebar from './components/Sidebar.vue'

const menuStore = useMenuStore()

onMounted(() => {
  menuStore.fetachMenu()
})
</script>


<template>
  <div class="layout">
    <!-- 侧边菜单 -->
    <aside class="sidebar">
      <Sidebar />
    </aside>

    <!-- 右侧区域 -->
    <div class="main">
      <!-- 头部 -->
      <header class="header">
        Header
      </header>

      <!-- 内容 -->
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

.sidebar {
  width: 200px;
  background: #2f3542;
  color: #fff;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  height: 60px;
  background: #f1f2f6;
}

.content {
  flex: 1;
  padding: 20px;
  overflow: auto;
}
</style>