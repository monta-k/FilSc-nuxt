import 'vuex'
import * as Users from '../../store/users/type'
import * as General from '../../store/type'

declare module 'vuex' {
  type RootState = {
    users: Users.S
    general: General.S
  }
  type RootGetters = Users.RG & General.RG
  type RootMutations = Users.RM & General.RM
  type RootActions = Users.RA & General.RA
}
