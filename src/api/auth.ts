import { service } from '@/utils/request';
import type { CodeInfo, LoginData } from './types/auth';

/**
 * 获取验证码
 * 此时 Get<CodeInfo> 对应的是脱壳后的 data 部分
 */
export const getCode = () => service.Get<CodeInfo>('/sys/getCode',{
   cacheFor: 0 
});

/**
 * 登录
 */
export const login = (data: any) => service.Post<LoginData>('/login', data);