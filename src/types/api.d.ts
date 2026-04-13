// 定义后端通用的响应体格式
export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}