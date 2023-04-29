import React from "react";
import { NavLink } from 'react-router-dom'
import '../components/App.css'

const Home = () => {
  return (
    <div className="wrapper d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-12 col-lg-6">
            <div className="text-center bg-secondary bg-gradient bg-opacity-75 text-white px-1 px-lg-2 py-3">
              <h4>"Take control of your day, one task at a time. Stay organized, prioritize, and achieve your goals with our to-do app."</h4>
              <p><NavLink to="/signup" className="btn btn-warning">Let's do this!</NavLink></p>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  )
}


export default Home;