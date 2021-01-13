import request from '@/utils/request';
import { history } from 'umi'
import { message } from 'antd'
const codeMatch = (res: any) => {
  switch (res.code) {
    case 0:
      return res;
    case 301:
      history.replace("/user/login");
      break;
    case 403:
      history.replace("/exception/403");
      break;
    case 404:
      history.replace("/exception/404");
      break;
    case 500:
      history.replace("/exception/500");
      break;
    default:
      break;
  }
  message.error(res.message, 4);
  return undefined
}
const get = async (url: string, params?: any) => {
  let response: any = await request.get(url, params)
  return codeMatch(response)
}
const post = async (url: string, params?: any) => {
  let response: any = await request.post(url, params)
  return codeMatch(response)
}

export default { get, post }