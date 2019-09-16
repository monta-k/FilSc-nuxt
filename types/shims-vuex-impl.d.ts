import 'vuex'
import * as Users from '../store/users/type'

declare module 'vuex' {
  type RootState = {
    users: Users.S
  }
  type RootGetters = Users.RG
  type RootMutations = Users.RM
  type RootActions = Users.RA
}