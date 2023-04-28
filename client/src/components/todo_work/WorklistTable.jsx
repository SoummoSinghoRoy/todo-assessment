import React, { Component } from "react";
import { connect } from 'react-redux';

import { loadAllWorksAction } from '../../store/actions/workAction';


class WorkListTable extends Component{

  componentDidMount() {
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
                          {/* <td>
                            <div className="d-inline">
                              <Button 
                                variant="warning"
                                className="px-4" 
                                onClick={() => this.openTransactionEditModal(transaction._id)}
                              >Edit</Button>
                              {
                                this.state.editAbleTransactionId === transaction._id ?    <EditTransactionModal 
                                  isShow = { this.state.editTransactionModal }
                                  isHide = { this.closeTransactionEditModal }
                                  currentTransactionInfo = { transaction }
                                /> : null
                              }
                              <button 
                                type="button" 
                                className="btn btn-danger px-3 ms-2"
                                onClick={ () => this.deleteTransaction(transaction._id) }
                              >Delete</button>
                            </div>
                          </td> */}
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
  }
}

export default connect(mapStateToProps, { loadAllWorksAction })(WorkListTable);