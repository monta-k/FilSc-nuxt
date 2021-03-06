import Vue from 'vue'
import { Getters, Mutations, Actions } from 'vuex'
import { S, G, M, A } from './type'
import firebase from '~/plugins/firebase.ts'

export const state = (): S => ({
  user: null,
  newUserName: null
})

export const getters: Getters<S, G> = {
  user: state => state.user,
  newUserName: state => state.newUserName,
  isAuthenticated: state => !!state.user
}

export const mutations: Mutations<S, M> = {
  setUser (state, { payload }) {
    state.user = payload
  },
  resetUser (state) {
    state.user = null
  },
  setNewUserName (state, name) {
    state.newUserName = name
  },
  resetNewUserName (state) {
    state.newUserName = null
  }
}

export const actions: Actions<S, A, G, M> = {
  async signinUser (this: Vue, { commit }, { newName }) {
    this.$axios.setHeader('Authorization', localStorage.getItem('jwt') || false)
    const payload = await this.$axios.$post(`${process.env.BaseUrl}/signin`, { name: newName })
    commit('setUser', { payload })
    this.$router.push('/')
  },
  signoutUser (this: Vue, { commit }) {
    commit('resetUser')
    localStorage.removeItem('jwt')
    this.$router.push('/signin')
  },
  async setFilmarksId (this: Vue, { commit }, { searchId }) {
    this.$axios.setHeader('Authorization', localStorage.getItem('jwt') || false)
    console.log(searchId)
    const data = await this.$axios.$patch(`${process.env.BaseUrl}/users`, { user: { filmarks_id: searchId } })
    commit('setUser', { payload: data })
  },
  async updateUserName (this: Vue, { commit }, { name }) {
    this.$axios.setHeader('Authorization', localStorage.getItem('jwt') || false)
    const data = await this.$axios.$patch(`${process.env.BaseUrl}/users`, { user: { name } })
    commit('setUser', { payload: data })
  },
  async deleteUser (this: Vue, { commit }) {
    this.$axios.setHeader('Authorization', localStorage.getItem('jwt') || false)
    await this.$axios.$delete(`${process.env.BaseUrl}/users`)
    commit('resetUser')
    const user = firebase.auth().currentUser
    if (user) {
      user.delete().then(() => {
        console.log('Delete User')
        this.$router.push('/')
      })
    }
  },
  setUser ({ commit }, payload) {
    commit('setUser', { payload })
  },
  resetUser ({ commit }) {
    commit('resetUser')
  },
  setNewUserName ({ commit }, name) {
    commit('setNewUserName', name)
  },
  resetNewUserName ({ commit }) {
    commit('resetNewUserName')
  }
}
