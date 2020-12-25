import request from 'umi-request';
import { ResumeDataType } from '../API.d';

export async function queryFakeList (params: { count: number }) {
  return request('/resume/getResumeData');
}

export async function queryRule (params?: ResumeDataType) {
  return request('/resume/getResume', {
    params,
  });
}

export async function removeRule (params: { id: string[] }) {
  return request('/resume/postResume', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}