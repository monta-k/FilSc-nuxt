import firebase from '~/plugins/firebase'

export default ({ $axios, store, redirect }) => {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      if (!store.getters['users/user']) {
        const idToken = await user.getIdToken()
        $axios.setHeader('Authorization', idToken)
        const data = await $axios.$post(`${process.env.BaseUrl}/signin`)
        await store.dispatch('users/setUser', data)
        localStorage.setItem('jwt', idToken.toString())
        await store.dispatch('fetchUserMovies')
      }
    } else {
      localStorage.removeItem('jwt')
      store.commit('resetMovies')
      store.commit('users/resetUser')
      return redirect('/signin')
    }
  })
}