import { combineReducers } from '@reduxjs/toolkit'

import { signUpReducer, logInReducer } from './authReducer';
import { allWorksReducer, createWorkReducer, deleteWorkReducer, editWorkReducer } from './workReducer';

const rootReducer = combineReducers({
  signUp: signUpReducer,
  logIn: logInReducer,
  all_works: allWorksReducer,
  create_todo: createWorkReducer,
  edited_todo: editWorkReducer,
  deleted_todo: deleteWorkReducer 
})

export default rootReducer;