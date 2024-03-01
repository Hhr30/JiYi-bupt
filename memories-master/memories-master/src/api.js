import axio from './config'
import Qs from 'qs'
import * as utils from '@/utils'
import axios from 'axios'

// 查询作品
export function getWork() {
  return axio({
    url: '/creation/list',
    method: 'get',
  })
}
// 查询具体作品信息
export function getWorkInfo(workId, headers) {
  return axio({
    url: '/creation?workId=' + workId,
    headers: headers
  })
}
//通过名字查询作品  返回一个列表
export function getWorkByName(name, headers) {
  return axio({
    url: '/creation/list' + "?name=" + name,
    method: 'get',
    headers: headers
  })
}
export function getWorkById(workId, headers) {
  return axio({
    url: '/creation/list' + "?workId=" + workId,
    method: 'GET',
    headers: headers
  })
}
//根据用户id查找用户
export function getUserById(userId, headers) {
  return axio({
    url: '/user/query' + "?userid=" + userId,
    method: 'GET',
    headers: headers
  })
}
// 查询作品列表
export function getWorkLists(workId, name) {
  return axio({
    url: '/creation/list',
    method: 'get',
    query: {
      workId,
      name
    }
  })
}
export function getWorkList() {
  return axio({
    url: '/creation/list',
    method: 'get',

  })
}
// 添加作品
export function addWork(data) {
  return axio({
    url: '/creation',
    method: 'post',
    data: data
  })
}

export function checkName(creationName) {   //检查作品名是否重复
  return axio({
    url: '/creation/name',
    method: 'GET',
    data: creationName
  })
}

// 更新作品
export function updateWork(data, config) {
  return axio({
    url: '/creation',
    method: 'put',
    data: data,
    config
  })
}

// 删除作品
export function deleteWork(params) {
  return axio({
    url: '/creation',
    method: 'post',
    params
  })
}

// 查询作品名
export function getWorkName() {
  return axio({
    url: '/creation/name',
    method: 'get'
  })
}

//  更新作品存证
export function updateDeposit(data, headers) {
  return axio({
    url: '/work',
    method: 'PUT',
    data: data,
    headers: headers
  })
}

// 发起作品存证
export function launchDeposit(data, headers) {
  return axio({
    url: '/work',
    method: 'POST',
    data: data,
    headers: headers
  })
}

// 获得存证信息
export function getDepositInfo(workId, headers) {
  return axio({
    url: '/work' + '?workId=' + workId,
    method: 'GET',
    headers: headers
  })
}

// 发起版权注册
export function launchEnroll(data, headers) {
  return axio({
    url: '/copyright',
    method: 'POST',
    data: data,
    headers: headers
  })
}

// 获得版权注册结果
export function getEnrollRes(workId, headers) {
  return axio({
    url: '/copyright' + "?workId=" + workId,
    method: 'GET',
    headers: headers
  })
}

// 更新版权注册信息
export function updateEnrollInfo(data) {
  return axio({
    url: '/copyright',
    method: 'put',
    data
  })
}

// 发起登记确权
export function launchRegister(data) {
  return axio({
    url: '/right',
    method: 'post',
    data
  })
}

// 获取登记确权结果
export function getRegisterRes() {
  return axio({
    url: '/right',
    method: 'get',
  })
}

// 更新登记确权信息
export function updateRegisterInfo(data, headers) {
  return axio({
    url: '/right',
    method: 'PUT',
    data: data,
    headers: headers
  })
}

// 上传登记确权证明材料
export function uploadRegisterProof(data) {
  return axio({
    url: '/right/file',
    method: 'POST',
    data: data
  })
}

// 查询文件
export function getFile() {
  return axio({
    url: '/right',
    method: 'get'
  })
}

// 用户查询
export function getUserInfoByName(username, headers) {
  return axio({
    url: "/user/query" + "?username=" + username,
    method: 'GET',
    headers: headers
  })
}
//根据电话号码获取用户
export function getUserInfoByNumber(phone, headers) {
  return axio({
    url: "/user/query" + "?phone=" + phone,
    method: 'GET',
    headers: headers
  })
}
export function userLogin(info) {   //用户登录
  return axio({
    url: "/user/login",
    method: 'POST',
    data: info
  })
}
export function register(userInfo) {   //注册
  return axio({
    url: "/user/register",
    method: 'POST',
    data: userInfo
  })
}
export function upload(data, headers) {    //上传文件
  return axio({
    url: "/right/file",
    method: 'POST',
    data: data,
    headers: headers
  })
}

/**
 * 查询单个作品的作品信息
 * 接口详情：https://www.apifox.cn/web/project/879662
 * @param {Object} params 请求参数
 * @returns {Object} 作品信息
 */
export const getCreation = (params = { workId: 0 }) => {
  const search = '?' + utils.toQuery(params)
  return axio({
    url: '/creation' + search,
    method: 'GET'
  }).then(res => {
    if (res && res.status === 200) {
      const body = res.data
      if (body && body.code === 200 && body.msg === 'SUCCESS') {
        return body.data || null
      } else {
        return null
      }
    } else {
      return null
    }
  }).catch(err => {
    console.error(err)
    return null
  })
}

/**
 * 查询作品简要信息列表
 * 接口详情：https://www.apifox.cn/web/project/879662
 * @param {Object} params 请求参数
 * @returns {Array} 作品简要信息
 */
export const getCreationList =  (params = { workId: 0, name: '', status: '', startDate: 0, endDate: 0 }) => {
  const search = '?' + utils.toQuery(params)
  return axio({
    url: '/creation/list' + search,
    method: 'GET',
  }).then(res => {
    if (res && res.status === 200) {
      const body = res.data
      if (body && body.code === 200 && body.msg === 'SUCCESS') {
        return body.data || null
      } else {
        return null
      }
    } else {
      return null
    }
  }).catch(err => {
    console.error(err)
    return null
  })
}

// 根据用户电话或用户名或用户id查询用户实名信息
export const queryUser = (params = { username: '', phone: '', userId: '' }) => {
  const search = '?' + utils.toQuery(params)
  return axio({
    url: '/user/query' + search,
    method: 'GET'
  }).then(res => {
    if (res && res.status === 200) {
      const body = res.data
      if (body && body.code === 200 && body.msg === 'SUCCESS') {
        return body.data || null
      } else {
        return null
      }
    } else {
      return null
    }
  }).catch(err => {
    console.error(err)
    return null
  })
}


// 获取用户信息
export const getUserInfo = () => {
  return axio({
    url: '/user/info',
    method: 'GET'
  }).then(async res => {
    if (res && res.status === 200) {
      const body = res.data
      if (body && body.code === 200 && body.msg === 'SUCCESS') {
        return body.data || null
      } else {
        return null
      }
    } else {
      return null
    }
  }).catch(err => {
    console.error(err)
    return null
  })
}

// 实名认证接口
export const realName = (params = { phone: '', name: '', identificationNumber: '' }) => {
  return axio({
    url: '/user/realname',
    method: 'POST',
    data: params
  }).then(async res => {
    console.log(res)
    if (res && res.status === 200) {
      const body = res.data
      if (body && body.code === 200 && body.msg === 'SUCCESS') {
        return body.data || null
      } else {
        return null
      }
    } else {
      return null
    }
  }).catch(err => {
    console.error(err)
    return null
  })
}