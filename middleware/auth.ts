import { Context } from '@nuxt/types'

export default ({ store, redirect, route }: Context) => {
  if (route.name !== 'signin' && !store.getters['users/user']) {
    redirect('/signin')
  }
  if (route.name === 'signin' && store.getters['users/user']) {
    redirect('/')
  }
}
