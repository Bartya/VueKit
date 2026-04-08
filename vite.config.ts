import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// 自动导入 API
import AutoImport from 'unplugin-auto-import/vite'

// 自动注册组件
import Components from 'unplugin-vue-components/vite'

// Element Plus 解析器
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: ['vue'], // 自动导入 vue 的所有API
      resolvers: [ElementPlusResolver()],
      dts: 'src/auto-imports.d.ts', // 自动生成类型声明（很重要）
    }),
    Components({
      dirs: ['src/components'], // 自动扫描的组件目录
      extensions: ['vue'],
      resolvers: [ElementPlusResolver()],
      deep: true, // 扫描子目录
      dts: 'src/components.d.ts', // TS 类型提示
    }),
  ],
  
  resolve: {
    alias: {
      // 方式1: 使用 fileURLToPath（推荐）
      '@': fileURLToPath(new URL('./src', import.meta.url)), // @/views -> src/views
    },
  },
})
