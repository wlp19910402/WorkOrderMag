import API from '@/services/API.d'
import httpServer from '@/utils/httpServer'
interface UploadOssSignParamsType {
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
interface UploadFileParamsType {
  file: FormData;
  share?: boolean;
  target?: string;
}
export const uploadOssSign = async (params: UploadOssSignParamsType) => {
  return httpServer.post(`${API.UPLOAD_OSS_SIGN}`, { data: { ...defaultUploadOssSign, ...params } });
}

export const uploadFile = async (params: UploadFileParamsType) => {
  console.log(params.file.get("key"))
  return httpServer.post(API.UPLOAD_FILE, { data: { share: true, ...params } })
}