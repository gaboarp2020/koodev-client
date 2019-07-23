export default {
  setCurrentUser (state, payload) {
    state.currentUser = payload
  },
  setToken (state, payload) {
    state.token = payload
  },
  login (state) {
    state.hasLogged = true
  },
  logout (state) {
    state.hasLogged = false
    state.currentUser = null
    state.token = null
  },
  loading (state) {
    state.hasLoading = true
  },
  done (state) {
    state.hasLoading = false
  }
}
