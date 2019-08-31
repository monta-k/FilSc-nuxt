import firebase from '~/plugins/firebase'

export default ({ store, redirect }) => {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const idToken = await user.getIdToken()
      store.dispatch('users/setUser', idToken)
    } else {
      return redirect('/signin')
    }
  })
}