import api from './index'
// axios
import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: api.Login,
    method: 'post',
    data
  })
}
// 用户信息 post 方法
// export function getUserInfo(data) {
//   return request({
//     url: api.getUserInfo,
//     method: 'post',
//     data,
//     hideloading: true
//   })
// }

// 用户名称 get 方法
// export function getUserName(params) {
//   return request({
//     url: api.UserName,
//     method: 'get',
//     params,
//     hideloading: true
//   })
// }

export function getUserInfo(data) {
  return request({
    url: api.getUserInfo,
    method: 'post',
    data,
    hideloading: true
  })
}
export function newPlay(data) {
  return request({
    url: api.newPlay,
    method: 'post',
    data,
    hideloading: true
  })
}
export function getDailyList(data) {
  return request({
    url: api.getDailyList,
    method: 'post',
    data,
    hideloading: true
  })
}
export function pay(data) {
  return request({
    url: api.pay,
    method: 'post',
    data,
    hideloading: true
  })
}
export function dataoog(data) {
  return request({
    url: api.dataoog,
    method: 'post',
    data,
    hideloading: true
  })
}
export function dataoogOk(data) {
  return request({
    url: api.dataoogOk,
    method: 'post',
    data,
    hideloading: true
  })
}
export function updateUserVance(data) {
  return request({
    url: api.updateUserVance,
    method: 'post',
    data,
    hideloading: true
  })
}
export function DataoogTest(data) {
  return request({
    url: api.DataoogTest,
    method: 'post',
    data,
    hideloading: true
  })
}
export function getFuturePool(data) {
  return request({
    url: api.getFuturePool,
    method: 'post',
    data,
    hideloading: true
  })
}
export function getBreakDailyList(data) {
  return request({
    url: api.getBreakDailyList,
    method: 'post',
    data,
    hideloading: true
  })
}
export function getDailyUsdt(data) {
  return request({
    url: api.getDailyUsdt,
    method: 'post',
    data,
    hideloading: true
  })
}
export function getOpenTime(data) {
  return request({
    url: api.getOpenTime,
    method: 'post',
    data,
    hideloading: true
  })
}
export function getAchievement(data) {
  return request({
    url: api.getAchievement,
    method: 'post',
    data,
    hideloading: true
  })
}
export function getLevelNum(data) {
  return request({
    url: api.getLevelNum,
    method: 'post',
    data,
    hideloading: true
  })
}

export function lockUser(data) {
  return request({
    url: api.lockUser,
    method: 'post',
    data,
    hideloading: true
  })
}

export function unLockUser(data) {
  return request({
    url: api.unLockUser,
    method: 'post',
    data,
    hideloading: true
  })
}
