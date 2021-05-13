import axios from 'axios'

export const state = () => ({})

export const mutations = {}

export const actions = {
  async login({state, commit, dispatch}, userData = {}) {
    try {
      const payload = {
        ...userData,
        client_id: this.$config.client_id,
        client_secret: this.$config.client_secret,
        grant_type: this.$config.grant_type
      }

      const response = await this.$auth.loginWith('local', {data: payload})
      this.$auth.setUser(response.data.user)
      dispatch('setTokenAuthorization', response.data.access_token)
      return response.data
    } catch (e) {
      throw new Error(e.response.data.error.message)
    }
  },
  async logout({dispatch}) {
    dispatch('setTokenAuthorization', null)
    return await this.$auth.logout()
  },
  // eslint-disable-next-line
  setTokenAuthorization({}, token) {
    axios.defaults.headers.common['Authorization'] = token
  },
  // eslint-disable-next-line
  async setCollection({}, payload) {
    try {
      const response = await axios.post(`${this.$axios.defaults.baseURL}/userarea/movies/collections`, payload)
      return response.data
    } catch (e) {
      if (e.response.data.errors) {
        throw e.response.data.errors
      }
    }
  }
}
