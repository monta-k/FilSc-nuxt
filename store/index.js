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
  resetClipMovies({ commit }) {
    commit('resetData')
  },
  async fetchClipMovies({ commit }, { userId, page }) {
    try{
      this.$axios.setHeader('Authorization', localStorage.getItem('jwt'))
      const data = await this.$axios.$get(`http://localhost:3000/api/v1/scrape/clip_movies`, { params: { userId: userId, page: page } })
      return data
    } catch (e) {
      console.log(e)
    }
  }
}