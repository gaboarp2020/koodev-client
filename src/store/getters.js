export default {
  firstName (state) {
    return (state.currentUser) ? state.currentUser.firstName : ''
  },
  lastName (state) {
    return (state.currentUser) ? state.currentUser.lastName : ''
  },
  email (state) {
    return (state.currentUser) ? state.currentUser.email : ''
  }
}
