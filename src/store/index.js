import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import { v4 as uuid_v4 } from "uuid";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    likedCommentIds: [],
    userId: '',
    selectedThemeId: '',
    lastVisitedRadio: '',
    snackbar: false,
    snackbarText: '',
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
    },
    setTheme: (state, payload) => {
      state.selectedThemeId = payload
    },
    setLastVisitedRadio: (state, payload) => {
      state.lastVisitedRadio = payload
    },
    openSnackbar: (state, payload) => {
      state.snackbar     = true
      state.snackbarText = payload
      setTimeout(() =>{
        state.snackbar = false
      }, 2000)
    },
    closeSnackbar: (state) => {
      state.snackbar = false
    },
  },
  getters: {
    likedCommentIds: (state) => state.likedCommentIds,
    userId: (state) => state.userId,
    selectedThemeId: (state) => state.selectedThemeId,
    lastVisitedRadio: (state) => state.lastVisitedRadio,
    snackbar: (state) => state.snackbar,
    snackbarText: (state) => state.snackbarText,
  },
  modules: {},
  plugins: [createPersistedState({
    paths: ['likedCommentIds', 'userId', 'selectedThemeId', 'lastVisitedRadio']
  })]
})
