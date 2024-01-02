import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {         //保存状态
    token: "",
    userInfo: null, // 用户信息
    realUserInfo: null, // 实名用户信息
    lastPath: ""
  },
  getters: {
  },
  mutations: {     //一些同步操作
    keepToken(state, token) {
      console.log(token)
      state.token = token
    },
    // 缓存用户信息
    storageUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    // 缓存实名用户信息
    storageRealUserInfo(state, realUserInfo) {
      state.realUserInfo = realUserInfo
    },
    changePath(state, path) {
      state.lastPath = path
    }
  },
  actions: {       //处理异步操作
  },
  modules: {
  }
})
