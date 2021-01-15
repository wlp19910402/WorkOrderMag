import API from '@/services/API.d'
import httpServer from '@/utils/httpServer'

type UploadOssSignParamsType = {
  fileMd5?: string;
  originalName: string;
  share?: boolean;
  target?: string;
}
const defaultUploadOssSign: UploadOssSignParamsType = {
  fileMd5: "",
  originalName: "",
  share: true,
  target: ""
}
export const uploadOssSign = async (params: UploadOssSignParamsType) => {
  return httpServer.post(`${API.UPLOAD_OSS_SIGN}`, { data: { ...defaultUploadOssSign, ...params } });
}

export const uploadStsSign = async () => {
  return httpServer.post(API.UPLOAD_STS_SIGN)
}