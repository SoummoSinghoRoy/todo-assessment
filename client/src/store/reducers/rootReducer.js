import { combineReducers } from '@reduxjs/toolkit'

import { signUpReducer, logInReducer } from './authReducer';
// import { allTransactionReducer, createTransactionReducer, deleteTransactionReducer, editTransactionReducer } from './transactionReducer';
import { allWorksReducer, createWorkReducer } from './workReducer';

const rootReducer = combineReducers({
  signUp: signUpReducer,
  logIn: logInReducer,
  all_works: allWorksReducer,
  create_todo: createWorkReducer 
})

export default rootReducer;