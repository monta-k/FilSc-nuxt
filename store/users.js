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
  async setFilmarksId({ commit }, { searchId }) {
    this.$axios.setHeader('Authorization', localStorage.getItem('jwt'))
    console.log(searchId)
    const data = await this.$axios.$patch(`${process.env.BaseUrl}/users`, { user: { filmarks_id: searchId } })
    commit('setUser', { payload: data })
  },
  setUser({ commit }, payload) {
    commit('setUser', { payload })
  },
  resetUser({ commit }) {
    commit('resetUser')
  }
}