import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  // 1. 状态定义
  const fontSize = ref(Number(localStorage.getItem('user-font-size')) || 14)
  const themeMode = ref(localStorage.getItem('theme-mode') || 'navy')

  // 2. 字号设置
  const setFontSize = (size: number) => {
    fontSize.value = size
    document.documentElement.style.setProperty('--base-font-size', `${size}px`)
    localStorage.setItem('user-font-size', size.toString())
  }

  // 3. 主题设置
  const setThemeMode = (mode: string) => {
    themeMode.value = mode
    localStorage.setItem('theme-mode', mode)
    applyTheme(mode)
  }

  // 4. 核心逻辑：应用主题颜色到全局 CSS 变量
  const applyTheme = (mode: string) => {
    const root = document.documentElement

    // 公共变量（字号等）
    root.style.setProperty('--base-font-size', `${fontSize.value}px`)

    if (mode === 'dark') {
      root.classList.add('dark') // 开启 Element Plus 暗黑模式
      setColors(root, {
        bg: '#141414',
        header: '#1d1e1f',
        sidebar: '#1d1e1f',
        text: '#cfd3dc',
        menuActive: '#262727',
        contentText: '#cfd3dc',
        btnBg: 'rgba(255, 255, 255, 0.08)',
        btnBorder: 'rgba(255, 255, 255, 0.15)',
      })
    } else if (mode === 'light') {
      root.classList.remove('dark')
      setColors(root, {
        bg: '#f5f7fa',
        header: '#ffffff',
        sidebar: '#ffffff',
        text: '#333333',
        contentText: '#333333',
        menuActive: '#ecf5ff',
        btnBg: 'rgba(0, 0, 0, 0.04)',
        btnBorder: 'rgba(0, 0, 0, 0.1)',
      })
    } else {
      // Navy 模式
      root.classList.remove('dark')
      setColors(root, {
        bg: '#f5f7fa',
        header: '#262f3e',
        sidebar: '#262f3e',
        text: '#ffffff',
        contentText: '#000000',
        menuActive: '#1e2531',
        btnBg: 'rgba(255, 255, 255, 0.1)',
        btnBorder: 'rgba(255, 255, 255, 0.2)',
      })
    }
  }

  // 辅助函数：批量设置 CSS 变量
  const setColors = (el: HTMLElement, colors: any) => {
    el.style.setProperty('--layout-bg', colors.bg)
    el.style.setProperty('--layout-header-bg', colors.header)
    el.style.setProperty('--layout-sidebar-bg', colors.sidebar)
    el.style.setProperty('--layout-text-color', colors.text)
    el.style.setProperty('--layout-menu-active-bg', colors.menuActive)
    el.style.setProperty('--header-btn-bg', colors.btnBg)
    el.style.setProperty('--header-btn-border', colors.btnBorder)
    el.style.setProperty('--content-text-color', colors.contentText)
  }

  const initConfig = () => {
    applyTheme(themeMode.value)
  }

  return { fontSize, themeMode, setFontSize, setThemeMode, initConfig }
})
