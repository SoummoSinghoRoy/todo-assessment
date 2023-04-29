import React, { Component } from "react";

import WorkListTable from "../components/todo_work/WorklistTable";
import StatusCard from "../components/todo_work/StatusCard";
import WorkCreateButton from "../components/todo_work/WorkCreateButton";
import Search from "../components/Search";

class Worklist extends Component {

  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-12">
            <StatusCard />
          </div>
          <div className="col-12">
            <div className="row mb-4">
              <div className="col-12 col-md-4 col-lg-4 mb-3 mb-lg-0 mb-md-0">
                <WorkCreateButton />
              </div>
              <div className="col-12 col-md-2 col-lg-2"></div>
              <div className="col-12 col-md-6 col-lg-">
                <Search />
              </div>
            </div>
            <WorkListTable />
          </div>
        </div>
      </div>
    )
  }
}


export default Worklist;