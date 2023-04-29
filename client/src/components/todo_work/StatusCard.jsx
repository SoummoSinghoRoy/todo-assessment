import React from "react";
import { connect } from 'react-redux';

import { loadAllWorksAction } from '../../store/actions/workAction';

const WorkStatusCard = (props) => {
  return(
    <div className="row my-5">
      <div className="col-12 col-md-4 col-lg-4">
        <div className="card mb-3 bg-success bg-gradient text-white shadow">
          <div className="row g-0">
            <div className="col-6 col-md-8">
              <div className="card-body">
                <h4 className="card-title">Completed</h4>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="card-body align-self-center">
                <h4 className="text-end">
                  { props.completed }
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4 col-lg-4">
        <div className="card mb-3 bg-warning bg-gradient text-secondary shadow">
          <div className="row g-0">
            <div className="col-6 col-md-8">
              <div className="card-body">
                <h4 className="card-title">Pending</h4>
              </div>
            </div>
            <div className="col-6 col-md-4">
            <div className="card-body align-self-center">
                <h4 className="text-end">
                  { props.pending }
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4 col-lg-4">
        <div className="card mb-3 bg-danger text-danger-emphasis shadow">
          <div className="row g-0">
            <div className="col-6 col-md-8">
              <div className="card-body">
                <h4 className="card-title">Dismiss</h4>
              </div>
            </div>
            <div className="col-6 col-md-4">
            <div className="card-body align-self-center">
                <h4 className="text-end">
                  { props.dismiss }
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    pending: state.all_works.pendingWork,
    completed: state.all_works.completeWork,
    dismiss: state.all_works.dismissWork,
  }
}

export default connect(mapStateToProps, { loadAllWorksAction })(WorkStatusCard);