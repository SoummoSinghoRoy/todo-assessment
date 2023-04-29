import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'
import Navigation from './Navigation'
import Home from '../../pages/Home';

const AppLayout = () => {
  const location = useLocation()
	return(
    <>
      {
         location.pathname === '/' ? <Home/> : 
         <div className="container">
          <div className='row'>
            <div className='col'>
              <Navigation />
              <Outlet />
            </div>
          </div>   
        </div> 
      }
    </>
	)
}

export default AppLayout;