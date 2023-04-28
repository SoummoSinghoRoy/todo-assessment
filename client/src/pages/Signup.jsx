import React, {Component} from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { signUpUserAction } from '../store/actions/authAction';
import withNavigateHook from "../components/withNavigateHook";

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    profession: ''
  }


  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    const { name, email, password, profession } = this.state
    this.props.signUpUserAction({name, email, password, profession}, this.props.navigation)
  }

  render() {
    let { name, email, password, profession } = this.state
    return (
      <div className="container">
        <div className="row my-3">
          <div className="col-3"></div>
          <div className="col-6">
            <div className="card px-3 py-3">
              <h5 className="text-center">Signup here</h5>
              <p className="text-center">Have an account? <Link to="/login" className="card-link">Login now</Link> </p>
              <div className="card-body">
                <form method="post" onSubmit={this.submitHandler}>
                  <div className="mb-3">
                    <label htmlFor= "name" className="form-label">Fullname</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      className={this.props.error.name ? 'form-control is-invalid' : 'form-control'}
                      value={ name } 
                      onChange={this.changeHandler}/>
                      { this.props.error.name && <div className="invalid-feedback">
                                        {this.props.error.name}
                                      </div> 
                      }
                      
                  </div>

                  <div className="mb-3">
                    <label htmlFor= "name" className="form-label">Profession</label>
                    <input 
                      type="text" 
                      id="profession" 
                      name="profession" 
                      className={this.props.error.profession ? 'form-control is-invalid' : 'form-control'}
                      value={ profession } 
                      onChange={this.changeHandler}/>
                      { this.props.error.profession && <div className="invalid-feedback">
                                        {this.props.error.profession}
                                      </div> 
                      }
                      
                  </div>

                  <div className="mb-3">
                    <label htmlFor= "email" className="form-label">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className={this.props.error.email ? 'form-control is-invalid' : 'form-control'}
                      value={ email } 
                      onChange={this.changeHandler}/>
                      { this.props.error.email &&  <div className="invalid-feedback">
                                          {this.props.error.email}
                                        </div>
                      }
                      
                  </div>

                  <div className="mb-3">
                    <label htmlFor= "password" className="form-label">Password</label>
                    <input 
                      type="password" 
                      id="password" 
                      name="password" 
                      className={this.props.error.password ? 'form-control is-invalid' : 'form-control'}
                      value={ password } 
                      onChange={this.changeHandler}/>
                      <p className="text-warning">Note: password must be between 6 to 10 character</p>
                      {this.props.error.password && <div className="invalid-feedback">
                                            {this.props.error.password}
                                          </div>
                      }
                  </div>

                  <button type="submit" className="btn btn-primary">Sign up</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.signUp.error,
  }
}
export default connect(mapStateToProps, {signUpUserAction})(withNavigateHook(Signup));