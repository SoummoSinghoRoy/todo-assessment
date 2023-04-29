import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';

import { loadAllWorksAction, editWorkAction } from '../../store/actions/workAction';
import WorkEditModal from "./WorkEditModal";

class WorkListTable extends Component{
  state = {
    editAbleWorkId: 0,
    editModal: false,
  }

  componentDidMount() {
    this.props.loadAllWorksAction()
  }

  componentDidUpdate() {
    let currentWork = [...this.props.allWorks]
    let updatedWork = this.props.updateWork
    currentWork.map((work) => {
      if(work._id === updatedWork._id) {
        return work = updatedWork
      }
      return work
    })
  }

  openWorkEditModal = (workId) => {
    this.setState({
      editAbleWorkId: workId,
      editModal: true
    })
  }

  closeWorkEditModal = () => {
    this.setState({
      editAbleWorkId: 0,
      editModal: false
    })
    this.props.loadAllWorksAction()
  }

  render() {
    return(
      <div className="card shadow">
        <div className="card-body">
          <h4 className="text-center text-secondary my-3">TO-DO work lists</h4>
          <div className="table-responsive">
            <table className="table mt-2">
              <thead className="table-warning text-center text-secondary">
                <tr>
                  <th>No.</th>
                  <th>Work Description</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
              {(() => {
                  if(this.props.allWorks.length !== 0) {
                    return this.props.allWorks.map((work, ind) => {
                      return(
                        <tr key={work._id}>
                          <td>{ind+1}</td>
                          <td>{work.work_description}</td>
                          <td>{work.deadline}</td>
                          <td>{work.status}</td>
                          <td>
                            <div className="d-inline">
                              <Button 
                                variant="warning"
                                className="px-4" 
                                onClick={() => this.openWorkEditModal(work._id)}
                              >Edit</Button>
                              {
                                this.state.editAbleWorkId === work._id ?
                                <WorkEditModal 
                                  isShow = { this.state.editModal }
                                  isHide = { this.closeWorkEditModal }
                                  currentworkInfo = { work }
                                /> : null
                              }
                              {/* <button 
                                type="button" 
                                className="btn btn-danger px-3 ms-2"
                                onClick={ () => this.deleteTransaction(transaction._id) }
                              >Delete</button> */}
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  }else {
                    return (
                      <tr>
                        <td colSpan="5" className="h5">Items empty</td>
                      </tr>
                    )
                  }
                })()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allWorks: state.all_works.workList,
    totalWorks: state.all_works.totalWorks,
    userInfo: state.all_works.userInfo,
    updateWork: state.edited_todo.updatedWork
  }
}

export default connect(mapStateToProps, { loadAllWorksAction, editWorkAction })(WorkListTable);