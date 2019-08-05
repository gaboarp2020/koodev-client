import {
  apolloClient
} from '../apollo'
import CURRENT_USER_QUERY from '@/graphql/Me.gql'

export default {
  async loginValidation ({
    commit
  }, userData) {
    return apolloClient.query({
      query: CURRENT_USER_QUERY
    })
      .then(data => {
        const user = data.data.me
        commit('setCurrentUser', user)
        commit('login')
        console.log(user)
      })
      .catch(error => {
        console.log(error)
      })
  }

}
