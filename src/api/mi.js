import request from '@/utils/request'

export function updateMi(params) {
  return request({
    url: '/bbs/mi/updateMi',
    method: 'post',
    data: params
  })
}
