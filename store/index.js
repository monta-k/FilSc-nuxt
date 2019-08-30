export const state = () => ({
  isLoading: false,
  title: '',
  movies: null,
  hasError: false,
})

export const getters = {
  isLoading: (state) => state.isLoading,
  title: (state) => state.title,
  movies: (state) => state.movies,
  hasError: (state) => state.hasError,
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
  setError(state) {
    state.hasError = true
  },
  resetError(state) {
    state.hasError = false
  }
}

export const actions = {
  loading({ commit }) {
    commit('loading')
  },
  notLoading({ commit }) {
    commit('notLoading')
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