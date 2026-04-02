import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: ['vue'], // 自动导入 vue 的所有API
      dts: 'src/auto-imports.d.ts', // 自动生成类型声明（很重要）
    }),
    Components({
      dirs: ['src/components'], // 自动扫描的组件目录
      extensions: ['vue'],
      deep: true, // 扫描子目录
      dts: 'src/components.d.ts' // TS 类型提示
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
