import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMenuAPI } from '@/api/menu'
// 👉 类型
export interface MenuItem {
  id: number
  name: string
  path: string
  component?: string
  children?: MenuItem[]
}

export const useMenuStore = defineStore('menu', () => {
  // 👉 状态
  const menuList = ref<MenuItem[]>([])
  // 👉 加载状态
  const loading = ref(false)
  // 👉 设置菜单
  const setMenuList = (data: MenuItem[]) => {
    menuList.value = data
  }
  // 👉 清空菜单
  const clearMenu = () => {
    menuList.value = []
  }
  // 👉 获取菜单
  const fetachMenu = async () => {
    loading.value = true
    const { data } = await getMenuAPI()
    setMenuList(data)
    loading.value = false
  }
  return {
    menuList,
    setMenuList,
    clearMenu,
    fetachMenu,
    loading,
  }
})
