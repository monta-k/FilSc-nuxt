import firebase from '~/plugins/firebase'

export default ({ store, redirect }) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      return redirect('/signin')
    }
  })
}