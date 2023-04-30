import React, {Component} from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import { editWorkAction } from '../../store/actions/workAction';

class WorkEditModal extends Component{
  state = {
    deadline: '',
    work_description: '',
    status: 'Pending',
    messageAlert: true,
    updateSuccessMsg: ''
  }

  componentDidMount() {
    this.setState({
      deadline: this.props.currentworkInfo.deadline,
      work_description: this.props.currentworkInfo.work_description,
      status: this.props.currentworkInfo.status
    })
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  selectHandler = (event) => {
    this.setState({
      status: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    const {deadline, work_description, status} = this.state
    this.props.editWorkAction(this.props.currentworkInfo._id, {deadline, work_description, status})
    this.setState({
      messageAlert: true,
      updateSuccessMsg: this.props.updateSuccessMsg,
    })
  }

  messageAlertClose = () => {
    this.setState({
      messageAlert: false,
      updateSuccessMsg: '',
    })
  }

  render() {
    const { deadline, work_description, status, updateSuccessMsg } = this.state
    return (
      <Modal show ={ this.props.isShow } onHide= {this.props.isHide}>
        {updateSuccessMsg ? <Alert 
                              variant="success" 
                              show={this.state.messageAlert} 
                              onClose=  {this.messageAlertClose} 
                              dismissible
                            >
                              <p className="my-0 fw-bolder">{ updateSuccessMsg}</p>
                            </Alert>: null }
        <Modal.Header closeButton>
          <Modal.Title>Update work</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method='post' onSubmit={this.submitHandler} className='pt-3 pb-5'>
            <Form.Group controlId="deadline">
              <Form.Label>Deadline</Form.Label>
              <Form.Control 
                type="date"
                name="deadline"
                value={ deadline }
                onChange = {this.changeHandler} 
              />
            </Form.Group>

            <Form.Group controlId="work_description" className='my-3'>
              <Form.Label>Short description</Form.Label>
              <Form.Control 
                as="textarea"
                style={{ height: '100px'}}
                name="work_description"
                value={ work_description }
                onChange = {this.changeHandler}
              />
            </Form.Group>  

            <Form.Group controlId="work_description" className='my-3'>
              <Form.Label>Current work status</Form.Label>
              <Form.Select aria-label="Current work status" value={status} onChange={this.selectHandler}>
                <option value="Pending">Pending</option>
                <option value="Complete">Complete</option>
                <option value="Dismiss">Dismiss</option>
              </Form.Select>
            </Form.Group>
            

            <Button variant="warning" type="submit" className='mt-4'>Update now</Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    updateSuccessMsg: state.edited_todo.updatesuccessMsg,
  }
}

export default connect(mapStateToProps, { editWorkAction })(WorkEditModal);