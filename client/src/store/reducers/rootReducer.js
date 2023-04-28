import { combineReducers } from '@reduxjs/toolkit'

import { signUpReducer, logInReducer } from './authReducer';
// import { allTransactionReducer, createTransactionReducer, deleteTransactionReducer, editTransactionReducer } from './transactionReducer';

const rootReducer = combineReducers({
  signUp: signUpReducer,
  logIn: logInReducer,
})

export default rootReducer;