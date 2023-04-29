import axios from 'axios';

import * as Types from './types';

export const searchResultAction = (searchterm) => (dispatch) => {
  axios.get(`api/search/term/${searchterm}`).then((response) => {
    dispatch({
      type: Types.Searching,
      payload: {
        queryterm: response.data.searchterm,
        searchdata: response.data.todo_work,
        totalItems: response.data.totalItems
      }
    })
  }).catch((err) => {
    console.log(err);
  })
}