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
  }
}
export default ApiEndPoints
