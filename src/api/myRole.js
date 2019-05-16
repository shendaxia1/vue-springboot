import request from '@/utils/request'

export function roleList(query) {
    return request({
      url: '/role/roleList',
      method: 'get',
      params: query
    })
  }

export function createRole(data){
  return request({
    url:'/role/roleAdd',
    method:'post',
    params: data
  })
}

export function updateRole(data){
  return request({
    url: '/role/updateRole',
    method: 'post',
    params: data
  })
}

export function deleteRole(data){
  return request({
    url: '/role/deleteRole',
    method: 'post',
    params: data
  })
}

export function permissionList(){
  return request({
    url: '/role/findAllRole',
    method: 'get'
  })
}

export function updatePermission(data){
  return request({
  url: '/role/alterPermission',
  method: 'post',
  params: data
  })
}