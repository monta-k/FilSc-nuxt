export const state = () => ({
  isLoading: false,
  movies: [],
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
  setMovies(state, { movies }) {
    state.movies = movies
  },
  resetMovies(state) {
    state.movies = []
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
  async fetchClipMovies({ commit }, { userId, page }) {
    try{
      this.$axios.setHeader('Authorization', localStorage.getItem('jwt'))
      const data = await this.$axios.$get(`http://localhost:3000/api/v1/scrape/clip_movies`, { params: { userId: userId, page: page } })
      return data
    } catch (e) {
      console.log(e)
    }
  },
  async resetClipMovies({ commit }) {
    try {
      await this.$axios.$delete('http://localhost:3000/api/v1/movies')
      commit('resetMovies')
    } catch (e) {
      console.log(e)
    }
  },
  async setClipMovies({ commit }, { movies }) {
    try {

      await this.$axios.$post('http://localhost:3000/api/v1/movies', { movies: movies })
      commit('setMovies', { movies: movies })
    } catch (e) {
      console.log(e)
    }
  },
  async updateClipMoviesDB({ dispatch }, { movies }) {
    try {
      this.$axios.setHeader('Authorization', localStorage.getItem('jwt'))
      await dispatch('resetClipMovies')
      console.log('reset movies')
      await dispatch('setClipMovies', { movies: movies })
      console.log('set movies')
    } catch (e) {
      console.log(e)
    }
  }
}