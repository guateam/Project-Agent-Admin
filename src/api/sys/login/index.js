import request from '@/plugin/axios'
import qs from 'qs'

export function AccountLogin (data) {
  data = qs.stringify(data)
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
