export default ({ store, redirect, route }) => {
  if (route.name !== 'signin' && !store.getters['users/user']) {
    redirect('/signin')
  }
  if (route.name === 'signin' && store.getters['users/user']) {
    redirect('/')
  }
}