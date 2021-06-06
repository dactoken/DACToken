const api = {
  Login: '/user/login',
  UserInfo: '/user/userinfo',
  UserName: '/user/name',

  // 钱包
  getUserInfo: 'Dataoog/getUserInfo', // 获取用户信息
  newPlay: 'Dataoog/newPlay', // 创建用户
  getDailyList: 'Dataoog/getDailyList', // 获取每日排名
  pay: 'Dataoog/play', // 给买理财
  dataoog: 'Dataoog/settlement', // 结算
  dataoogOk: 'Dataoog/settlementOk',
  updateUserVance: 'Dataoog/updateUserVance', // 更新vac数量
  DataoogTest: 'Dataoog/test', // 测试
  getFuturePool: 'Dataoog/getFuturePool', // 获取72开奖池
  getBreakDailyList: 'Dataoog/getBreakDailyList', // 获取昨日排名
  getDailyUsdt: 'Dataoog/getDailyUsdt', // 获取今日入场资金
  getOpenTime: 'Dataoog/getOpenTime', // 获取开奖时间
  getAchievement: 'Dataoog/areaYeji', //获取业绩
  getLevelNum: 'Dataoog/getLevelNum', //获取级别
  lockUser: 'Dataoog/lockUser',
  unLockUser: 'Dataoog/unlockUser'
}

export default api
