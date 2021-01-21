import request from '@/utils/request';
import { history } from 'umi'
import { message } from 'antd'
import { stringify } from 'querystring';
const codeMatch = (res: any) => {
  switch (res.code) {
    case 0:
      return res;
    case 301:
      if (window.location.pathname.includes('/user/login')) return null
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: window.location.href,
        }),
      });
      break;
    default:
      break;
  }
  message.error(res.message, 4);
  return undefined
}
const get = async (url: string, params?: any) => {
  const response: any = await request.get(url, params)
  return codeMatch(response)
}
const post = async (url: string, params?: any) => {
  const response: any = await request.post(url, params)
  return codeMatch(response)
}

export default { get, post }