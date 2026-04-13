// 验证码返回结果
export interface CodeInfo {
  uuid: string;
  img: string;
  code?: string; // 假设后端有时会返回验证码字符
}

// 登录接口返回（例如返回 Token）
export interface LoginData {
  token: string;
  expire: number;
}