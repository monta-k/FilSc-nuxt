export const state = () => ({
  user: null
})

export const getters = {
  user: (state) => state.user,
  isAuthenticated: (state) => !!state.user
}

export const mutations = {
  setUser(state, { payload }) {
    state.user = payload
  },
  resetUser(state) {
    state.user = null
  }
}

export const actions = {
  setUser({ commit }, payload) {
    commit('setUser', { payload })
  },
  resetUser({ commit }) {
    commit('resetUser')
  }
}