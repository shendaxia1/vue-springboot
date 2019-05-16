import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {//新增员工
  return request({
    url: '/user/addUser',
    method: 'post',
    params: data
  })
}

export function deleteUser(data){//删除员工
  return request({
    url: '/user/deleteUser',
    menthod:'post',
    params: data
  })
}

export function updateArticle(data) {//更新信息
  return request({
    url: '/user/updateUser',
    method: 'post',
    params: data
  })
}

export function selectUser(data){
  return request({
    url: '/user/selectUser',
    method:'get',
    params:data
  })
}

export function roleList(){
  return request({
    url:'/role/findAll',
    menthod: 'get'
  })
}

export function updateRole(data){
  return request({
    url:'/role/alterRole',
    method: 'post',
    params:data
  })
}
