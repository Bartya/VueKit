import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  const fontSize = ref(Number(localStorage.getItem('user-font-size')) || 14)
  const themeMode = ref(localStorage.getItem('theme-mode') || 'navy')

  const setFontSize = (size: number) => {
    fontSize.value = size
    document.documentElement.style.setProperty('--base-font-size', `${size}px`)
    localStorage.setItem('user-font-size', size.toString())
  }

  const setThemeMode = (mode: string) => {
    themeMode.value = mode
    localStorage.setItem('theme-mode', mode)
    applyTheme(mode)
  }

  const applyTheme = (mode: string) => {
    const root = document.documentElement
    root.style.setProperty('--base-font-size', `${fontSize.value}px`)

    if (mode === 'dark') {
      root.classList.add('dark')
      setColors(root, {
        bg: '#141414',
        header: '#1d1e1f',
        sidebar: '#1d1e1f',
        text: '#cfd3dc',
        menuActive: '#262727',
        // --- Header 按钮 ---
        headerBtnBg: 'rgba(255, 255, 255, 0.08)',
        headerBtnBorder: 'rgba(255, 255, 255, 0.15)',
        headerBtnText: '#cfd3dc',
        // --- 内容区按钮 (暗黑模式下通常与 Header 接近) ---
        contentBtnBg: '#2c2c2c',
        contentBtnBorder: '#4c4d4f',
        contentBtnText: '#cfd3dc'
      })
    } else if (mode === 'light') {
      root.classList.remove('dark')
      setColors(root, {
        bg: '#f5f7fa',
        header: '#ffffff',
        sidebar: '#ffffff',
        text: '#333333',
        menuActive: '#ecf5ff',
        // --- Header 按钮 ---
        headerBtnBg: 'rgba(0, 0, 0, 0.04)',
        headerBtnBorder: 'rgba(0, 0, 0, 0.1)',
        headerBtnText: '#333333',
        // --- 内容区按钮 (亮色模式) ---
        contentBtnBg: '#ffffff',
        contentBtnBorder: '#dcdfe6',
        contentBtnText: '#333333'
      })
    } else {
      // Navy 模式 (Header 深蓝，但内容区依然是亮色的)
      root.classList.remove('dark')
      setColors(root, {
        bg: '#f5f7fa',
        header: '#262f3e',
        sidebar: '#262f3e',
        text: '#ffffff',
        menuActive: '#1e2531',
        // --- Header 按钮 (需要白色半透明) ---
        headerBtnBg: 'rgba(255, 255, 255, 0.1)',
        headerBtnBorder: 'rgba(255, 255, 255, 0.2)',
        headerBtnText: '#ffffff',
        // --- 内容区按钮 (即使 Header 是深蓝，内容区按钮也应该像 Light 模式一样清晰) ---
        contentBtnBg: '#ffffff',
        contentBtnBorder: '#dcdfe6',
        contentBtnText: '#333333'
      })
    }
  }

  const setColors = (el: HTMLElement, c: any) => {
    el.style.setProperty('--layout-bg', c.bg)
    el.style.setProperty('--layout-header-bg', c.header)
    el.style.setProperty('--layout-sidebar-bg', c.sidebar)
    el.style.setProperty('--layout-text-color', c.text)
    el.style.setProperty('--layout-menu-active-bg', c.menuActive)
    
    // Header 专用按钮变量
    el.style.setProperty('--header-btn-bg', c.headerBtnBg)
    el.style.setProperty('--header-btn-border', c.headerBtnBorder)
    el.style.setProperty('--header-btn-text', c.headerBtnText)
    
    // 内容区专用按钮变量
    el.style.setProperty('--content-btn-bg', c.contentBtnBg)
    el.style.setProperty('--content-btn-border', c.contentBtnBorder)
    el.style.setProperty('--content-btn-text', c.contentBtnText)
  }

  const initConfig = () => applyTheme(themeMode.value)

  return { fontSize, themeMode, setFontSize, setThemeMode, initConfig }
})