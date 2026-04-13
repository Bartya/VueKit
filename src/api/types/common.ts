// 基础响应结构
export interface Res<T = any> {
  code: number;
  msg: string;
  data: T;
}

// 分页数据结构（如果有的话）
export interface PageRes<T> {
  list: T[];
  total: number;
  pageSize: number;
  pageNum: number;
}