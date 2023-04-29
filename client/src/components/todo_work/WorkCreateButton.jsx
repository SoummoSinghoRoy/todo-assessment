import React, {Component} from "react";
import { Button } from 'react-bootstrap';

import WorkCreateModal from "./WorkCreateModal";

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

export default WorkCreateButton;