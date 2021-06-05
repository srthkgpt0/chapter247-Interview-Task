export const notRequiredAuthPaths = [
  '/',
  '/forgot-password',
  '/reset-password/:token'
]

export const redirectPathIfRequireAuthFails = '/'

export const redirectPathIfNotRequiredAuthFails = [
  //   {
  //     path: '/app/account',
  //     userTypes: ['admin']
  //   },
  {
    path: '/dashboard',
    userTypes: ['admin']
  }
  //   {
  //     path: '/login',
  //     userTypes: ['user']
  //   }
]
