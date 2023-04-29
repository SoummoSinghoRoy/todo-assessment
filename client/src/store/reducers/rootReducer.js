import { combineReducers } from '@reduxjs/toolkit'

import { signUpReducer, logInReducer } from './authReducer';
// import { allTransactionReducer, createTransactionReducer, deleteTransactionReducer, editTransactionReducer } from './transactionReducer';
import { allWorksReducer, createWorkReducer, editWorkReducer } from './workReducer';

const rootReducer = combineReducers({
  signUp: signUpReducer,
  logIn: logInReducer,
  all_works: allWorksReducer,
  create_todo: createWorkReducer,
  edited_todo: editWorkReducer 
})

export default rootReducer;