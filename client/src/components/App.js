import React, {Component} from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppLayout from './partials/AppLayout';
import AuthenticateRoute from './partials/AuthenticateRoute';
import UnAuthenticateRoute from './partials/UnAuthenticateRoute';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Guideline from '../pages/Guideline';
import Worklist from '../pages/Worklist';

class App extends Component {
  render () {
    return (
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element= { <AppLayout/> }>
              <Route index element= {<Home/>}/>
              <Route path='worklist' element= {
                <AuthenticateRoute>
                  <Worklist />
                </AuthenticateRoute>
              }/>
              <Route path='guideline' element= {
                <UnAuthenticateRoute>
                  <Guideline />
                </UnAuthenticateRoute>
              }/>
              <Route path='signup' element= {
                <UnAuthenticateRoute>
                  <Signup />
                </UnAuthenticateRoute>
              }/>
              <Route path='login' element= {
                <UnAuthenticateRoute>
                  <Login />
                </UnAuthenticateRoute>
              }/>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;