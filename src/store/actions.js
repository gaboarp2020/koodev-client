import { getCurrentUser } from '../apollo'

export default {
  loginValidation ({
    commit
  }, userData) {
    return new Promise((resolve, reject) => {
      const user = getCurrentUser()
      commit('setCurrentUser', user)
      resolve(user)
    })
  }
}
