export interface User {
  id: number
  name: string
  email: string
  uid: string
  filmarksId: string
}

export interface S {
  user: User | null
  newUserName: string | null
}

export interface G {
  user: User | null
  newUserName: string | null
  isAuthenticated: boolean
}

export interface RG {
  'users/user': G['user']
  'users/newUserName': G['newUserName']
  'users/isAuthenticated': G['isAuthenticated']
}

export interface M {
  setUser: { payload: User }
  resetUser: void
  setNewUserName: string | null
  resetNewUserName: void
}

export interface RM {
  'users/setUser': M['setUser']
  'users/resetUser': M['resetUser']
  'users/setNewUserName': M['setNewUserName']
  'users/resetNewUserName': M['resetNewUserName']
}

export interface A {
  signinUser: { newName: string }
  signoutUser: void
  setFilmarksId: { searchId: string }
  updateUserName: { name: string }
  deleteUser: void
  setUser: User
  resetUser: void
  setNewUserName: string | null
  resetNewUserName: void
}

export interface RA {
  'users/signinUser': A['signinUser']
  'users/signoutUser': A['signoutUser']
  'users/setFilmarksId': A['setFilmarksId']
  'users/updateUserName': A['updateUserName']
  'users/deleteUser': A['deleteUser']
  'users/setUser': A['setUser']
  'users/resetUser': A['resetUser']
  'users/setNewUserName': A['setNewUserName']
  'users/resetNewUserName': A['resetNewUserName']
}
