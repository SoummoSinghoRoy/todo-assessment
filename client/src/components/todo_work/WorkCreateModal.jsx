import React, {Component} from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import { createWorkAction, loadAllWorksAction } from '../../store/actions/workAction'

class CreateWorkModal extends Component {
  state = {
    deadline: '',
    work_description: '',
    messageAlert: true,
    createSuccessMsg: '',
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    const { deadline, work_description } = this.state
    this.props.createWorkAction({deadline, work_description})
    this.setState({
      deadline: '',
      work_description: '',
      messageAlert: true,
      createSuccessMsg: this.props.createSuccessMsg,
    })
  }

  messageAlertClose = () => {
    this.setState({
      messageAlert: false,
      createSuccessMsg: '',
    })
    this.props.loadAllWorksAction()
  }

  render() {
    const { deadline, work_description } = this.state
    return (
      <Modal show ={ this.props.isShow } onHide= {this.props.isHide}>
        {this.props.createSuccessMsg ? <Alert 
                              variant="success" 
                              show={this.state.messageAlert} 
                              onClose=  {this.messageAlertClose} 
                              dismissible
                            >
                              <p className="my-0 fw-bolder">{ this.props.createSuccessMsg }</p>
                            </Alert>: null }
        <Modal.Header closeButton>
          <Modal.Title>Add new work</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method='post' onSubmit={this.submitHandler}>
            <Form.Group controlId="deadline">
              <Form.Label>Deadline</Form.Label>
              <Form.Control 
                type="date"
                name="deadline"
                value={ deadline }
                onChange = {this.changeHandler}
                isInvalid={this.props.error.deadline} 
              />
              {this.props.error.deadline && <Form.Control.Feedback type="invalid">{this.props.error.deadline}</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group controlId="work_description" className='mt-3'>
              <Form.Label>Short description</Form.Label>
              <Form.Control 
                as="textarea"
                style={{ height: '100px'}}
                name="work_description"
                value={ work_description }
                onChange = {this.changeHandler}
                isInvalid={this.props.error.work_description} 
              />
              {this.props.error.work_description && <Form.Control.Feedback type="invalid">{this.props.error.work_description}</Form.Control.Feedback>}
            </Form.Group>
            <Button variant="secondary" type="submit" className='mt-4'>Save now</Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.create_todo.error,
    createSuccessMsg: state.create_todo.work.msg
  }
}

export default connect(mapStateToProps, {createWorkAction, loadAllWorksAction})(CreateWorkModal);