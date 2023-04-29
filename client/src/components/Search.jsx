import React, { Component } from "react";
import './App.css'
import { connect } from 'react-redux';

import { loadAllWorksAction } from '../store/actions/workAction';
import { searchResultAction } from "../store/actions/searchAction";

class Search extends Component {

  searchChangeHandler = (event) => {
    console.log(event.target.value);
    const searchterm = event.target.value;
    if(searchterm) {
      this.props.searchResultAction(searchterm)
    }else {
      this.props.loadAllWorksAction()
    }
  }

  render() {
    return(
      <>
        <input 
          className="form-control me-2 mb-2 search-box" 
          type="search"
          name='term' 
          placeholder='Search by status: pending/complete/dismiss'
          onChange={this.searchChangeHandler}
        />
      </>
    )
  }
}

export default connect(null, { loadAllWorksAction, searchResultAction })(Search);