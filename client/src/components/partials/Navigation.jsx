import React from 'react';
import {NavLink, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUserAction } from '../../store/actions/authAction';

const Navigation = (props) => {
  const navgiation = useNavigate()
  
  const logoutBtnClickHandler = () => {
    props.logoutUserAction(navgiation)
  }

  return(
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-warning-subtle">
        <div className="container">
          <NavLink className="navbar-brand" to="/">TODO-App</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={({isActive}) => isActive ? 'nav-link active fw-bold' : 'nav-link fw-semibolder'} to="/">Home</NavLink>
              </li>
              {
                props.user.isAuthenticated ? 
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? 'nav-link active fw-bold' : 'nav-link fw-semibolder'} to="/worklist">Worklist</NavLink>
                  </li>
                  <li className="nav-item">
                    <button type="button" className="btn btn-danger" onClick={logoutBtnClickHandler} style={{background: "none", color: "#333129", border: "none"}}>Logout</button>
                  </li>
                </React.Fragment> :
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? 'nav-link active fw-bold' : 'nav-link fw-semibolder'} to="/signup">Sign up</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? 'nav-link active fw-bold' : 'nav-link fw-semibolder'} to="/login">Log in</NavLink>
                  </li>
                </React.Fragment> 
              }
            </ul>
          </div>
      </div>
    </nav>
    </>
    
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.logIn
  }
}

export default connect(mapStateToProps, {logoutUserAction})(Navigation);