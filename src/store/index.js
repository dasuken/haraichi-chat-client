import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import { v4 as uuid_v4 } from "uuid";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    likedCommentIds: [],
    userId: ''
  },
  mutations: {
    likeComment: (state, payload) => {
      state.likedCommentIds.push(payload)
    },
    unlikeComment: (state, payload) => {
      const index = state.likedCommentIds.findIndex(comment => comment._id === payload)
      state.likedCommentIds.splice(index, 1)
    },
    publishUserId: (state) => {
      state.userId = uuid_v4()
    }
  },
  getters: {
    likedCommentIds: (state) => state.likedCommentIds,
    userId: (state) => state.userId
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
