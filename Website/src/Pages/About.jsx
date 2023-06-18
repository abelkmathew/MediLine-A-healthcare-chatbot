import React from 'react'
import about_img  from '../Assets/about-img.jpg'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className='about-session'>
        <section className="about_section layout_padding">
    <div className="container  ">
      <div className="row">
        <div className="col-md-6 ">
          <div className="img-box">
            <img src={about_img} alt=""></img>
          </div>
        </div>
        <div className="col-md-6">
          <div className="detail-box">
            <div className="heading_container">
              <h2>
                About <span>Us</span>
              </h2>
            </div>
            <p>
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
              in some form, by injected humour, or randomised words which don't look even slightly believable. If you
              are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in
              the middle of text. All
            </p>
            <Link to="/about">Read More</Link>
              
            
          </div>
        </div>
      </div>
    </div>
  </section>
    </div>
  )
}

export default About