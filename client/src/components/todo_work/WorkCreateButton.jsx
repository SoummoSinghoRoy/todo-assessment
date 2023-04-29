import React, {Component} from "react";
import { Button } from 'react-bootstrap';
import { connect } from "react-redux";

import WorkCreateModal from "./WorkCreateModal";
import { loadAllWorksAction } from "../../store/actions/workAction";

class WorkCreateButton extends Component {
  state = {
    createModal: false,
  }

  openWorkCreateModal = () => {
    this.setState({
      createModal: true
    })
  }

  closeWorkCreateModal = () => {
    this.setState({
      createModal: false
    })
    this.props.loadAllWorksAction()
  }

  render() {
    return(
      <div>
        <Button 
          variant="secondary"
          onClick={this.openWorkCreateModal}
        >
          Add todo item
        </Button>
        <WorkCreateModal 
          isShow = { this.state.createModal }
          isHide = { this.closeWorkCreateModal }
        />
      </div>
    )
  }
}

export default connect(null, { loadAllWorksAction })(WorkCreateButton);