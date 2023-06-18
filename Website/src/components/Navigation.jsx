import React from 'react'
import { Link, withRouter } from "react-router-dom";


function Navigation(props) {
  return (
    <div>
      <header className="header_section">
        <div className="navbar-block">
          <nav className="navbar fixed-top navbar-expand-lg custom_nav-container ">
          <div className="container">
            <Link className="navbar-brand" to="/"><span>
                MediLine
              </span></Link>
                
        
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className=""> </span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`}>
                    <Link className="nav-link" to="/">HOME</Link></li>
                <li className={`nav-item  ${props.location.pathname === "/about" ? "active" : ""}`}>
                    <Link className="nav-link" to="/about">ABOUT US</Link></li>
                <li className={`nav-item  ${props.location.pathname === "/departments" ? "active" : ""}`}>
                    <Link className="nav-link" to="/departments">DEPARTMENTS</Link></li>
                <li className={`nav-item  ${props.location.pathname === "/doctor" ? "active" : ""}`}>
                    <Link className="nav-link" to="/doctor">DOCTORS</Link></li>
                <li className={`nav-item  ${props.location.pathname === "/contact" ? "active" : ""}`}>
                    <Link className="nav-link" to="/contact">CONTACT US</Link></li>
                <li className={`nav-item  ${props.location.pathname === "/loading" ? "active" : ""}`}>
                  <Link className="nav-link" to="/loading">DOCTOR DASHBOARD</Link></li>                   
              </ul>
            </div>
          </div>
         </nav>
        </div>
      </header>
    </div>
  )
}

export default withRouter(Navigation);