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
  async getUser({ commit }, payload) {
    try{
      const data = await this.$axios.$get(`http://localhost:3000/api/v1/users/show`, { params: { userId: userId } })
      commit('setData', { data })
    } catch (e) {
      console.log(e)
      commit('setError')
    }
  },
  setUser({ commit }, payload) {
    commit('setUser', { payload })
  },
  resetUser({ commit }) {
    commit('resetUser')
  }
}