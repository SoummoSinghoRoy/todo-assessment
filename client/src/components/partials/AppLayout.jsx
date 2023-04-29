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
         <div className='container'>
          <Navigation />
          <Outlet />
         </div>
      }
    </>
	)
}

export default AppLayout;