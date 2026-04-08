import { createPinia } from 'pinia'
import piniaPersistedState from 'pinia-plugin-persistedstate'

const pinia = createPinia()

// 应用持久化插件
pinia.use(piniaPersistedState)

export default pinia