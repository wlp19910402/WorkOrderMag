import request from 'umi-request';

export async function queryResumeDetail (params: { id: string }) {
  return request('/resume/fetchResumeDetail', {
    method: 'POST',
    data: params,
  });
}
