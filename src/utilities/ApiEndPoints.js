import config from '../components/config'

const ApiEndPoints = {
  login: {
    url: '/auth/user',
    method: 'POST'
  },
  signUp: {
    url: '/auth/signup',
    method: 'POST'
  },
  updateUser: {
    url: '/auth/user',
    method: 'PATCH'
  },
  deleteUser: {
    url: '/auth/user',
    method: 'DELETE'
  },
  USER_LIST_FILE_DOWNLOAD: {
    url: `${config.API_BASE_URL}/auth/user/download-list`
  }
}
export default ApiEndPoints
