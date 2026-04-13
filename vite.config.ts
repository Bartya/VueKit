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
    server: {
    host: '0.0.0.0', // 允许局域网访问
    port: 5173,      // 端口号
    proxy: {
      // 代理前缀：当请求路径以 /api 开头时，转发到目标服务器
      '/api': {
        target: 'http://corp.tongkaikj.com:9094/',
        changeOrigin: true, // 允许跨域
        // 如果后端接口本身不包含 /api 路径，则需要重写路径
        // 例如：请求 /api/user -> 转发到 http://corp.tongkaikj.com:9094/user
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      // 方式1: 使用 fileURLToPath（推荐）
      '@': fileURLToPath(new URL('./src', import.meta.url)), // @/views -> src/views
    },
  },
})
