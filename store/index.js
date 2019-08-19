export const state = () => ({
  isLoading: false,
  title: '',
  movies: null
})

export const getters = {
  isLoading: (state) => state.isLoading,
  title: (state) => state.title,
  movies: (state) => state.movies
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
  }
}

export const actions = {
  loading({ commit }) {
    commit('loading')
  },
  notLoading({ commit }) {
    commit('notLoading')
  },
  async fetchData({ commit }) {
    commit('loading')
    try{
      const data = await this.$axios.$get('http://localhost:3000/api/v1')
      commit('setData', { data })
    } catch (e) {
      console.log(e)
    }
    commit('notLoading')
  }
}