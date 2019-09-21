import Vue from 'vue'
import { Getters, Mutations, Actions } from 'vuex'
import { S, G, M, A } from './type'

export const state = (): S => ({
  isLoading: false,
  movies: [],
  errorMessage: '',
  popularMovies: []
})

export const getters: Getters<S, G> = {
  isLoading: (state) => state.isLoading,
  movies: (state) => state.movies,
  errorMessage: (state) => state.errorMessage,
  popularMovies: (state) => state.popularMovies
}

export const mutations: Mutations<S, M> = {
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
  },
  setPopularMovies(state, { movies }) {
    state.popularMovies = movies
  }
}

export const actions: Actions<S, A, G, M> = {
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
  async fetchUserMovies(this: Vue, { commit }) {
    try {
      this.$axios.setHeader('Authorization', localStorage.getItem('jwt') || false)
      const data = await this.$axios.$get(`${process.env.BaseUrl}/movies`)
      commit('setMovies', { movies: data })
    } catch (e) {
      console.log(e)
    }
  },
  async fetchClipMovies(this: Vue, { commit }, { userId, page }) {
    try{
      this.$axios.setHeader('Authorization', localStorage.getItem('jwt') || false)
      const data = await this.$axios.$get(`${process.env.BaseUrl}/scrape/clip_movies`, { params: { userId: userId, page: page } })
      return data
    } catch (e) {
      console.log(e)
    }
  },
  async resetClipMovies(this: Vue, { commit }) {
    try {
      await this.$axios.$delete(`${process.env.BaseUrl}/movies`)
      commit('resetMovies')
    } catch (e) {
      console.log(e)
    }
  },
  async setClipMovies(this: Vue, { commit }, { movies }) {
    try {

      const data = await this.$axios.$post(`${process.env.BaseUrl}/movies`, { movies: movies })
      commit('setMovies', { movies: data })
    } catch (e) {
      console.log(e)
    }
  },
  async updateClipMoviesDB(this: Vue, { dispatch }, { movies }) {
    try {
      this.$axios.setHeader('Authorization', localStorage.getItem('jwt') || false)
      await dispatch('resetClipMovies')
      console.log('reset movies')
      await dispatch('setClipMovies', { movies: movies })
      console.log('set movies')
    } catch (e) {
      console.log(e)
    }
  },
  async setPopularMovies(this: Vue, { commit }) {
    try {
      const data = await this.$axios.$get(`${process.env.BaseUrl}/popular_movies`)
      commit('setPopularMovies', { movies: data })
    } catch (e) {
      console.log(e)
    }
  }
}