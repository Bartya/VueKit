import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  // 默认 14px
  const fontSize = ref(Number(localStorage.getItem('user-font-size')) || 14)

  // 更新字号并应用到全局
  const setFontSize = (size: number) => {
    fontSize.value = size
    document.documentElement.style.setProperty('--base-font-size', `${size}px`)
    localStorage.setItem('user-font-size', size.toString())
  }

  // 初始化方法
  const initConfig = () => {
    setFontSize(fontSize.value)
  }

  return { fontSize, setFontSize, initConfig }
})