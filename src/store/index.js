import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    likedCommentIds: []
  },
  mutations: {
    likeComment: (state, payload) => {
      state.likedCommentIds.push(payload)
    },
    unlikeComment: (state, payload) => {
      const index = state.likedCommentIds.findIndex(comment => comment._id === payload)
      state.likedCommentIds.splice(index, 1)
    }
  },
  getters: {
    likedCommentIds: (state) => state.likedCommentIds,
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
