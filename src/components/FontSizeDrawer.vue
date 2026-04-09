<template>
  <el-drawer
    v-model="visible"
    title="界面设置"
    size="300px"
    direction="rtl"
    destroy-on-close
  >
    <div class="setting-item">
      <h4 class="label">全局字体大小</h4>
      <div class="slider-wrapper">
        <el-slider
          v-model="fontSize"
          :min="12"
          :max="22"
          :step="1"
          show-input
          @input="handleFontSizeChange"
        />
      </div>
      <div class="preset-buttons">
        <el-button size="small" @click="handleFontSizeChange(14)">标准</el-button>
        <el-button size="small" @click="handleFontSizeChange(18)">大号</el-button>
        <el-button size="small" @click="handleFontSizeChange(20)">特大</el-button>
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

// 这里的 visible 与父组件通过 v-model 绑定
const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const fontSize = ref(configStore.fontSize)

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
  margin-bottom: 20px;
  color: var(--el-text-color-primary);
}
.preset-buttons {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}
.preview-box {
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  background-color: var(--el-fill-color-light);
  /* 预览框跟随变量变化 */
  font-size: var(--base-font-size); 
}
</style>