import axios from 'axios';
import jwtDeCode from 'jwt-decode';

import * as Types from './types';
import sendAuthenticateUserToken from '../../utils/sendAuthencticateUserToken';

export const signUpUserAction = (user, redirect) => (dispatch) => {
  axios.post("api/auth/signup", user).then((res) => {
    dispatch({
      type: Types.SignUp_User,
      payload: {
        registeredUser: res.data,
        error: {}
      }
    })
    redirect('/login')
  }).catch((err) => {
    console.log(err.response.data);
    dispatch({
      type: Types.SignUp_Error,
      payload: {
        error: err.response.data
      }
    })
  })
}

export const logInUserAction = (user, redirect) => (dispatch) => {
  axios.post("api/auth/login", user).then((res) => {
    const token = res.data.token
    localStorage.setItem('loggedIn_user_token', token)
    sendAuthenticateUserToken(token)
    const decode = jwtDeCode(token)
    dispatch({
      type: Types.LogIn_User,
      payload: {
        user: decode
      }
    })
    redirect('/worklist')
  }).catch((err) => {
    dispatch({
      type: Types.LogIn_Error,
      payload: {
        error: err.response.data
      }
    })
  })
}

export const logoutUserAction = (redirect) => {
  localStorage.removeItem('loggedIn_user_token')
  redirect('/login')
  return {
    type: Types.Logout_User,
    payload: {
      user: {},
      error: {},
    }
  }
}

export const clearAuthState = () => (dispatch) => {
  dispatch({ type: Types.Clear_State })
}