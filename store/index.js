export const state = () => ({
  isLoading: false,
  title: '',
  movies: null,
  errorMessage: '',
})

export const getters = {
  isLoading: (state) => state.isLoading,
  title: (state) => state.title,
  movies: (state) => state.movies,
  errorMessage: (state) => state.errorMessage,
}

export const mutations = {
  loading(state) {
    state.isLoading = true
  },
  notLoading(state) {
    state.isLoading = false
  },
  setData(state, { data }) {
    state.title = data.title
    state.movies = data.movie
  },
  resetData(state) {
    state.title = ''
    state.movies = null
  },
  setError(state, message) {
    state.errorMessage = message
  },
  resetError(state) {
    state.errorMessage = ''
  }
}

export const actions = {
  loading({ commit }) {
    commit('loading')
  },
  notLoading({ commit }) {
    commit('notLoading')
  },
  setError({ commit }, message) {
    commit('setError', message)
  },
  resetError({ commit }) {
    commit('resetError')
  },
  async fetchData({ commit }, userId) {
    commit('resetData')
    commit('loading')
    try{
      console.log(process.env.BASE_API)
      const data = await this.$axios.$get(`${process.env.BASE_API}/api/v1`, { params: { userId: userId } })
      commit('setData', { data })
    } catch (e) {
      console.log(e)
      commit('setError')
    }
    commit('notLoading')
  }
}