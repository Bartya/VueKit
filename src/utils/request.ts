import { createAlova } from 'alova';
import VueHook from 'alova/vue';
import GlobalFetch from 'alova/fetch';

// 1. 定义后端返回的原始完整结构
interface ApiResponse<T> {
  code: number;
  data: T;
  msg: string; // 或者 message，根据后端字段定
}

export const service = createAlova({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
  timeout: 10000,
  
  responded: {
    // onSuccess 接收的是原生的 Response 对象
    onSuccess: async (response) => {
      if (response.status !== 200) throw new Error('网络异常');
      
      // 解析 JSON，类型为 ApiResponse<any>
      const json = await response.json();
      
      const { code, data, msg } = json;
      
      // 业务逻辑判断
      if (code === 200) {
        // ⭐ 脱壳：直接返回 data。
        // 这样后面 useRequest 拿到的 data 就是这个 data 里的内容
        return data; 
      } else {
        // 抛出错误，进入 onError 逻辑
        // 这里可以做全局提示：ElMessage.error(msg)
        throw new Error(msg || '业务处理失败');
      }
    },
    
    onError: (err) => {
      console.error('请求错误:', err.message);
      return Promise.reject(err);
    }
  }
});