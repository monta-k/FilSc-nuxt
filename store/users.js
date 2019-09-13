export const state = () => ({
  user: null,
  newUserName: null,
})

export const getters = {
  user: (state) => state.user,
  newUserName: (state) => state.newUserName,
  isAuthenticated: (state) => !!state.user
}

export const mutations = {
  setUser(state, { payload }) {
    state.user = payload
  },
  resetUser(state) {
    state.user = null
  },
  setNewUserName(state, name) {
    state.newUserName = name
  },
  resetNewUserName(state) {
    state.newUserName = null
  }
}

export const actions = {
  async signinUser({ commit }, { newName }) {
    this.$axios.setHeader('Authorization', localStorage.getItem('jwt'))
    const payload = await this.$axios.$post(`${process.env.BaseUrl}/signin`, { name: newName})
    commit('setUser', { payload })
    this.$router.push('/')
  },
  signoutUser({ commit }) {
    commit('resetUser')
    this.$router.push('/signin')
  },
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
  },
  setNewUserName({ commit }, name) {
    commit('setNewUserName', name)
  },
  resetNewUserName({ commit }) {
    commit('resetNewUserName')
  }
}