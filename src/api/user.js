import request from '@/utils/request'
import qs from 'qs'
export function checklogin(data) {
  return request({
    url: '/user/findUser',
    method: 'post',
    data:qs.stringify(data)
  })
}

export function getPermission(token) {//登陆后自动执行这个方法，获取用户权限，这里的token我们传的是userid
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

