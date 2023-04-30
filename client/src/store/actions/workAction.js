import axios from 'axios';

import * as Types from './types';

export const loadAllWorksAction = () => (dispatch) => {
  console.log("loaded task");
  axios.get('api/todo').then((response) => {
    dispatch({
      type: Types.Work_List,
      payload: {
        allworks: response.data.todo_work,
        totalWorks: response.data.totalWork,
        pendingWork: response.data.pendingWork,
        completeWork: response.data.completeWork,
        dismissWork: response.data.dismissWork,
        userInfo: response.data.user
      }
    })
  }).catch((error) => {
    console.log(error);
  })
}

export const createWorkAction = (todoWork) => (dispatch) => {
  axios.post('api/todo/add', todoWork).then((response)=> {
    console.log(response);
    dispatch({
      type: Types.Work_Create,
      payload: {
        work: response.data
      }
    })
  }).catch((error) => {
    dispatch({
      type: Types.Work_Create_Error,
      payload: {
        error: error.response.data
      }
    })
  })
}

export const deleteWorkAction = (workId) => (dispatch) => {
  axios.delete(`api/todo/delete/${workId}`).then((response) => {
    dispatch({
      type: Types.Work_Delete,
      payload: {
        deletedWorkId: response.data.deletedWork._id,
        successMessage: `Work deleted successfully`
      }
    })
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: Types.Work_Delete_Error,
      payload: {
        errorMessage: `Work isn't deleted`
      }
    })
  })
}

export const editWorkAction = (workId, updatedWork) => (dispatch) => {
  axios.put(`api/todo/edit/${workId}`, updatedWork).then((response) => {
    dispatch({
      type: Types.Work_Edit,
      payload: {
        updatedWork: response.data.updatedToDo_work,
        successMsg: response.data.msg
      }
    })
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: Types.Work_Edit_Error,
      payload: {
        errorMessage: `Work can't update`
      }
    })
  })
}