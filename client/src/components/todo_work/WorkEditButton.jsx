import React, {Component} from "react";
import { Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import WorkEditModal from "./WorkEditModal";
import { loadAllWorksAction } from '../../store/actions/workAction';

class WorkEditButton extends Component {
  state = {
   
  }

  

  

  render() {
    return(
      <div>
        <Button 
          variant="warning" 
          onClick={this.openWorkEditModal}
        >
          Add todo item
        </Button>
        <WorkEditModal 
          isShow = { this.state.editModal }
          isHide = { this.closeWorkEditModal }
        />
      </div>
    )
  }
}

export default connect(null, {loadAllWorksAction})(WorkEditButton);