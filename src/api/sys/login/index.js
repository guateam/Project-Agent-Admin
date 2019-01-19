import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    url: '/account/login',
    method: 'post',
    data
  })
}
