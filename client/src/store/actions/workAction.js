import axios from 'axios';

import * as Types from './types';

export const loadAllWorksAction = () => (dispatch) => {
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

/*export const deleteTransactionAction = (transactionId) => (dispatch) => {
  axios.delete(`api/transaction/delete/${transactionId}`).then((response) => {
    dispatch({
      type: Types.Transaction_Delete,
      payload: {
        deletedTransactionId: response.data.deletedTransaction._id,
        successMessage: `Transaction deleted successfully`
      }
    })
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: Types.Transaction_Delete_Error,
      payload: {
        errorMessage: `Transaction isn't deleted`
      }
    })
  })
}*/

/*export const editTransactionAction = (transactionId, updatedTransaction) => (dispatch) => {
  axios.put(`api/transaction/edit/${transactionId}`, updatedTransaction).then((response) => {
    dispatch({
      type: Types.Transaction_Edit,
      payload: {
        updatedTransaction: response.data.updatedTransaction,
        successMessage: response.data.msg
      }
    })
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: Types.Transaction_Edit_Error,
      payload: {
        errorMessage: `Transaction can't update`
      }
    })
  })
}*/