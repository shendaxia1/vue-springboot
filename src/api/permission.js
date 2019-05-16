import request from '@/utils/request'

export function permissionList(data){
    return request({
        url: '/permission/permissionList',
        method: 'get',
        params: data
    })
}

export function createPermission(data){
    return request({
        url: '/permission/addpermission',
        method: 'post',
        params: data
    })

}

 export function deletePermission(data){
     return request({
         url: '/permission/deletePermission',
         method: 'post',
         params: data
     })
 }

 export function updatePermission(data){
     return request({
         url: '/permission/alterPermission',
         methhod: 'post',
         params: data
     })
 }