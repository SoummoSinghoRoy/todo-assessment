import * as Types from '../actions/types';

let allWorksState = {
  workList: [],
  totalWorks: 0,
  pendingWork: 0,
  completeWork: 0,
  dismissWork: 0,
  userInfo: {},
  error: {},
}

export const allWorksReducer = (state= allWorksState, action) => {
  switch (action.type) {
    case Types.Work_List: return {
      ...state,
      workList: action.payload.allworks,
      totalWorks: action.payload.totalWorks,
      pendingWork: action.payload.pendingWork,
      completeWork: action.payload.completeWork,
      dismissWork: action.payload.dismissWork,
      userInfo: action.payload.userInfo
    };
    case Types.Searching: return {
      ...state,
      workList: action.payload.searchdata,
      totalworks: action.payload.totalItems
    };
    default: return state
  }
}

let createWorkState = {
  work: {},
  error: {},
}

export const createWorkReducer = (state = createWorkState, action) => {
  switch(action.type) {
    case Types.Work_Create: return {
      ...state,
      work: action.payload.work,
    };
    case Types.Work_Create_Error: return {
      ...state,
      error: action.payload.error
    };
    case Types.Clear_State: return {
      work: {},
      error: {},
    };
    default: return state
  }
}

let deletedWorkState = {
  deletedWorkId: 0,
  deleteSuccessMsg: '',
  deleteErrorMsg: ''
}

export const deleteWorkReducer = (state = deletedWorkState, action) => {
  switch(action.type) {
    case Types.Work_Delete: return {
      ...state,
      deletedWorkId: action.payload.deletedWorkId,
      deleteSuccessMsg: action.payload.successMessage
    };
    case Types.Work_Delete_Error: return {
      ...state,
      deleteErrorMsg: action.payload.errorMessage
    };
    case Types.Clear_State: return {
      deletedWorkId: 0,
      deleteSuccessMsg: '',
      deleteErrorMsg: ''
    };
    default: return state
  }
}

let editWorkState = {
  updatedWork: {},
  updatesuccessMsg: '',
  errorMessage: ''
}

export const editWorkReducer = (state = editWorkState, action) => {
  switch(action.type) {
    case Types.Work_Edit: return {
      updatedWork: action.payload.updatedWork,
      updatesuccessMsg: action.payload.successMsg, 
      errorMessage: ''
    };
    case Types.Work_Edit_Error:return {
      ...state,
      errorMessage: action.payload.errorMessage
    };
    case Types.Clear_State: return {
      updatedWork: {},
      updatesuccessMsg: '',
      errorMessage: ''
    };
    default: return state
  }
}