export default {
  currentUser: null,
  token: localStorage.getItem('token') || '',
  hasLogged: false,
  isLoading: false
}
