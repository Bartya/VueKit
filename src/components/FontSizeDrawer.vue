<template>
  <el-drawer v-model="visible" title="界面设置" size="300px" direction="rtl" destroy-on-close>
    <!-- 字体设置 -->
    <div class="setting-item">
      <h4 class="label">全局字体大小</h4>
      <div class="slider-wrapper">
        <el-slider v-model="fontSize" :min="12" :max="22" :step="1" show-input />
      </div>
      <div class="preset-buttons">
        <el-button size="small" @click="handleFontSizeChange(14)">标准</el-button>
        <el-button size="small" @click="handleFontSizeChange(18)">大号</el-button>
      </div>
    </div>

    <el-divider />

    <!-- 主题设置 -->
    <div class="setting-item">
      <h4 class="label">布局主题</h4>
      <div class="theme-options">
        <div
          class="theme-item light"
          :class="{ active: configStore.themeMode === 'light' }"
          @click="configStore.setThemeMode('light')"
          title="亮色模式"
        ></div>
        <div
          class="theme-item inverted"
          :class="{ active: configStore.themeMode === 'inverted' }"
          @click="configStore.setThemeMode('inverted')"
          title="侧边栏深色"
        ></div>
        <div
          class="theme-item dark"
          :class="{ active: configStore.themeMode === 'dark' }"
          @click="configStore.setThemeMode('dark')"
          title="暗黑模式"
        ></div>
      </div>
    </div>

    <el-divider />

    <div class="preview-box">
      <p>预览文字：</p>
      <p>落霞与孤鹜齐飞，秋水共长天一色。</p>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useConfigStore } from '@/stores/modules/useConfigStore.ts'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const configStore = useConfigStore()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const fontSize = ref(configStore.fontSize)
watch(
  () => fontSize.value,
  (val) => {
    handleFontSizeChange(val)
  },
)

const handleFontSizeChange = (val: number) => {
  fontSize.value = val
  configStore.setFontSize(val)
}
</script>

<style scoped>

.setting-item {
  padding: 10px 0;
}
.label {
  margin-bottom: 15px;
  color: var(--layout-text-color);
}
.preset-buttons {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  color: var(--layout-text-color);
}

/* 主题选项样式 */
.theme-options {
  display: flex;
  gap: 15px;
}
.theme-item {
  width: 50px;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
  position: relative;
  background: #f0f2f5;
  overflow: hidden;
}
.theme-item.active {
  border-color: var(--el-color-primary);
}

/* 模拟主题外观的装饰 */
.theme-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 30%;
  height: 100%;
}
.theme-item::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 70%;
  height: 25%;
}

.light::before {
  background: #fff;
}
.light::after {
  background: #fff;
  border-bottom: 1px solid #ddd;
}

.inverted::before {
  background: #001529;
}
.inverted::after {
  background: #fff;
  border-bottom: 1px solid #ddd;
}

.dark::before {
  background: #141414;
}
.dark::after {
  background: #141414;
}

.preview-box {
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  background-color: var(--layout-header-bg);
  font-size: var(--base-font-size);
}
</style>
