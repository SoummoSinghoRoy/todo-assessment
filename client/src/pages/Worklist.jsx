import React, { Component } from "react";
import { connect } from 'react-redux';

import WorkListTable from "../components/todo_work/WorklistTable";
import StatusCard from "../components/todo_work/StatusCard";
import WorkCreateButton from "../components/todo_work/WorkCreateButton";

class Worklist extends Component {

  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-12">
            <StatusCard />
          </div>
          <div className="col-12">
            <div className="mb-4">
              <WorkCreateButton />
            </div>
            <WorkListTable />
          </div>
        </div>
      </div>
    )
  }
}


export default Worklist;