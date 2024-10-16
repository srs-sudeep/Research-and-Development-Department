import * as actionTypes from './authActions'

export const initialState = {
  user: null,
  tokens: null,
  loading: false,
  error: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        loading: false,
      }

    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        tokens: null,
      }

    default:
      return state
  }
}

export default authReducer
