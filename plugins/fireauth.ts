import { Context } from '@nuxt/types'
import firebase from '~/plugins/firebase.ts'

export default (context: Context) => {
  const { store } = context

  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const newName = store.getters['users/newUserName']
        const idToken = await user.getIdToken(true)
        localStorage.setItem('jwt', idToken)
        await store.dispatch('users/signinUser', { newName })
        if (newName) { store.dispatch('users/resetNewUserName') }
      } else {
        store.dispatch('users/signoutUser')
      }
      resolve()
    })
  })
}
