import request from 'umi-request';
import { ResumeDataType } from '../API.d';

export async function queryFakeList (params: { count: number }) {
  return request('/resume/getResumeData');
}

export async function queryRule (params?: ResumeDataType) {
  return request('/resume/getResumeDataList', {
    params,
  });
}