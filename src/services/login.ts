import request from '@/utils/request';

export interface LoginParamsType {
  username: string;
  password: string;
  code: string;
}

// req.post(url, params, callback);
// req.get();
//获取图片验证码
export async function fetchImgCaptcha () {
  return request('/api/sys/login-captcha.jpg', {
    method: "GET"
  })
}
//登录
export async function fakeAccountLogin (params: LoginParamsType) {
  return request('/api/sys/login', {
    method: 'POST',
    data: params,
  });
}
//根据token刷新token值
export async function fackAccountToken () {
  return request('/api/user/current', {
    method: "GET"
  })
}
//根据token刷新token值
export async function fackLogout () {
  return request('/api/sys/logout', {
    method: "POST"
  })
}
