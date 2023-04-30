import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';

import { loadAllWorksAction, editWorkAction, deleteWorkAction, clearStateAction } from '../../store/actions/workAction';
import WorkEditModal from "./WorkEditModal";
import Pagination from "../Pagination";
import {searchResultAction} from '../../store/actions/searchAction';

class WorkListTable extends Component{
  state = {
    editAbleWorkId: 0,
    editModal: false,
    deleteMsgAlert: true,
    currentpage: 1,
    itemPerPage: 4
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

  deleteWork = (workId) => {
    this.props.allWorks.map((work) => {
      if(work._id === workId) {
        this.props.deleteWorkAction(workId)
      }
      return work
    })
  }

  deleteWorkAlertClose = () => {
    this.setState({
      deleteMsgAlert: false,
    })
    this.props.clearStateAction()
    this.props.loadAllWorksAction()
  }

  paginateClickHandler = (pageNumber) => {
    this.setState({
      currentpage: pageNumber
    })
  }
  previousPage = () => {
    if(this.state.currentpage !== 1) {
      this.setState({
        currentpage: this.state.currentpage - 1
      })
    }
  }
  nextPage = () => {
    if (this.state.currentpage !== Math.ceil(this.props.allWorks.length /this.state.itemPerPage)) {
       this.setState({
        currentpage: this.state.currentpage + 1
       })
    }
 };

  render() {
    const { currentpage, itemPerPage } = this.state;
    const indexOfLastItem = currentpage * itemPerPage;
    const indexOffirstItem = indexOfLastItem - itemPerPage;
    const perPageWorks = this.props.allWorks.slice(indexOffirstItem, indexOfLastItem);
    return(
      <>
        <div className="shadow">
            {(()=> {
                if(this.props.deleteSuccessMsg !== "") {
                  return(
                    <Alert variant="success" show={this.state.deleteMsgAlert} onClose={this.deleteWorkAlertClose} dismissible>
                      <p className="my-0 fw-bolder">{ this.props.deleteSuccessMsg }</p>
                    </Alert>
                  )
                }else if(this.props.deleteErrorMsg !== "") {
                  return(
                    <Alert variant="warning" show={this.state.deleteMsgAlert} onClose={this.deleteWorkAlertClose} dismissible>
                      <p className="my-0 fw-bolder">{ this.props.deleteErrorMsg }</p>
                    </Alert>
                  )
                }
            })()}
        </div>

        <div className="card shadow mb-3">
          <div className="card-body">
            <div className="d-flex">
              <h4 className="text-center text-secondary my-3">TO-DO work lists</h4>
              <div className="ms-auto">
                {
                  this.props.allWorks.length !== 0 ? <Pagination 
                    currentpage = { currentpage }
                    itemPerPage={itemPerPage} 
                    totalWorks={this.props.allWorks.length} 
                    paginationHandler= {this.paginateClickHandler}
                    previousPage={this.previousPage}
                    nextPage={this.nextPage}
                  /> : null
                }
              </div>
            </div>
            
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
                <tbody className="text-center align-middle">
                {(() => {
                    if(perPageWorks !== undefined) {
                      return perPageWorks.map((work, ind) => {
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
                                <Button 
                                  type="button"
                                  variant="danger" 
                                  className="px-3 ms-2 mt-2 mt-md-0 mt-md-0"
                                  onClick={ () => this.deleteWork(work._id) }
                                >Delete</Button>
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
      </>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allWorks: state.all_works.workList,
    totalWorks: state.all_works.totalWorks,
    userInfo: state.all_works.userInfo,
    updateWork: state.edited_todo.updatedWork,
    deletedWorkId: state.deleted_todo.deletedWorkId,
    deleteSuccessMsg: state.deleted_todo.deleteSuccessMsg,
    deleteErrorMsg: state.deleted_todo.deleteErrorMsg,
  }
}

export default connect(mapStateToProps, { loadAllWorksAction, editWorkAction, deleteWorkAction, searchResultAction, clearStateAction })(WorkListTable);