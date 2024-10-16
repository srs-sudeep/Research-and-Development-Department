// src/store/auth/actions.js
export const LOGIN_START = '@auth/LOGIN_START'
export const LOGIN_SUCCESS = '@auth/LOGIN_SUCCESS'
export const LOGIN_FAILURE = '@auth/LOGIN_FAILURE'
export const LOGOUT = '@auth/LOGOUT'

export const loginStart = () => ({
  type: LOGIN_START,
})

export const loginSuccess = (user, tokens) => ({
  type: LOGIN_SUCCESS,
  payload: { user, tokens },
})

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
})

export const logout = () => ({
  type: LOGOUT,
})
