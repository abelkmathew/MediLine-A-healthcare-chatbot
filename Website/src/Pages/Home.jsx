import React from 'react'
import { Link } from 'react-router-dom'
import hero_bg from '../Assets/hero-bg.png'
import s1 from '../Assets/s1.png'
import s2 from '../Assets/s2.png'
import s3 from '../Assets/s3.png'
import s4 from '../Assets/s4.png'
import about_img from '../Assets/about-img.jpg'
import doctor1 from '../Assets/d1.jpg'
import doctor2 from '../Assets/d2.jpg'
import doctor3 from '../Assets/d3.jpg'
import client from '../Assets/client.jpg'
import hospital from '../Assets/hospital.jpg'


function Hero() {
  return (
    <div >
          <div className="hero_area container">

<div className="hero_bg_box">
  <img src={hero_bg} alt=""></img>
</div>

<section className="slider_section ">
  <div id="customCarousel1" className="carousel slide" data-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <div className="container ">
          <div className="row">
            <div className="col-md-7">
              <div className="detail-box">
                <h1>
                  Welcome to MediLine
                </h1>
                <p>
                  We are Team 13 from CSE Alpha (Rajagiri School Of Engineering & Technology) and this is our project "MediLine Chatbot". Scroll down to Know more. 
                </p>
                <div className="btn-box">
              
                  <Link className="btn1" to='/'>Read More</Link>  
               
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="carousel-item ">
        <div className="container ">
          <div className="row">
            <div className="col-md-7">
              <div className="detail-box">
                <h1>
                Welcome to MediLine
                </h1>
                <p>
                This page gives an overall representation of a hospital website where our MediLine Chatbot will be available for patients for online services like Appointment and Revisiting.
                </p>
                <div className="btn-box">
                  <button  className="btn1">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="container ">
          <div className="row">
            <div className="col-md-7">
              <div className="detail-box">
                <h1>
                  We Provide Best Healthcare Facilities
                </h1>
                <p>
                  To access Online appointment facilities, please click the chat icon at the bottom right screen to access our Chatbot
                </p>
                <div className="btn-box">
                  <button href="/" className="btn1">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ol className="carousel-indicators">
      <li data-target="#customCarousel1" data-slide-to="0" className="active"></li>
      <li data-target="#customCarousel1" data-slide-to="1"></li>
      <li data-target="#customCarousel1" data-slide-to="2"></li>
    </ol>
  </div>

</section>

</div>




<section className="department_section layout_padding">
<div className="department_container">
  <div className="container ">
    <div className="heading_container heading_center">
      <h2>
        Our Departments
      </h2>
      <p>
        We have a total of 14 departments available.
      </p>
    </div>
    <div className="row">
      <div className="col-md-3">
        <div className="box ">
          <div className="img-box">
            <img src={s1} alt=""></img>
          </div>
          <div className="detail-box">
            <h5>
              Cardiology
            </h5>
            <p>
            Deals with the disorders of the heart as well as some parts of the cardiovascular system.
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="box ">
          <div className="img-box">
            <img src={s2} alt=""></img>
          </div>
          <div className="detail-box">
            <h5>
              Medical
            </h5>
            <p>
            Includes diagnosis, treatment, and prevention of disease, medical research, and many other aspects of health.
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="box ">
          <div className="img-box">
            <img src={s3} alt=""></img>
          </div>
          <div className="detail-box">
            <h5>
              Surgical
            </h5>
            <p>
            To provide treatment to all patients with surgical diseases.It covers diagnosis, treatment, and prevention of disease, medical research, and many other aspects of health.
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="box ">
          <div className="img-box">
            <img src={s4} alt=""></img>
          </div>
          <div className="detail-box">
            <h5>
              Immunology/Allergic 
            </h5>
            <p>
            Deals with delivering superlative care along with evidence-based diagnosis and treatment of patients of all ages with a broad spectrum of immunological or Allergic disorders
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="btn-box">
      <Link to='/'>
        View All
      </Link>
    </div>
  </div>
</div>
</section>



<section className="about_section layout_margin-bottom">
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
          We are members of Team 13 and this is our poject "MediLine" which features a Chatbot developed based on the RASA framework which is an opensource framework for developing chatbots. Our chatbot is capable of disease prediction based on a set of symptoms provided by the user. It also provided automated department classification facilities and online slot booking access.
        </p>
        <button >
          Read More
        </button>
      </div>
    </div>
  </div>
</div>
</section>


<section className="doctor_section layout_padding">
<div className="container">
  <div className="heading_container heading_center">
    <h2>
      Our Doctors
    </h2>
    <p className="col-md-10 mx-auto px-0">
      We have a total of 22 highly qualified doctors specializing in various medical fields across different departments.
    </p>
  </div>
  <div className="row">
    <div className="col-sm-6 col-lg-4 mx-auto">
      <div className="box">
        <div className="img-box">
          <img src={doctor1} alt=""></img>
        </div>
        <div className="detail-box">
          <div className="social_box">
            <a href="/">
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </a>
            <a href="/">
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </a>
            <a href="/">
              <i className="fa fa-youtube" aria-hidden="true"></i>
            </a>
            <a href="/">
              <i className="fa fa-linkedin" aria-hidden="true"></i>
            </a>
          </div>
          <h5>
            Celine George
          </h5>
          <h6 className="">
            Doctor
          </h6>
        </div>
      </div>
    </div>
    <div className="col-sm-6 col-lg-4 mx-auto">
      <div className="box">
        <div className="img-box">
          <img src={doctor2} alt=""></img>
        </div>
        <div className="detail-box">
          <div className="social_box">
            <a href="/">
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </a>
            <a href="/">
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </a>
            <a href="/">
              <i className="fa fa-youtube" aria-hidden="true"></i>
            </a>
            <a href="/">
              <i className="fa fa-linkedin" aria-hidden="true"></i>
            </a>
          </div>
          <h5>
            K V Vasudevan
          </h5>
          <h6 className="">
            Doctor
          </h6>
        </div>
      </div>
    </div>
    <div className="col-sm-6 col-lg-4 mx-auto">
      <div className="box">
        <div className="img-box">
          <img src={doctor3} alt=""></img>
        </div>
        <div className="detail-box">
          <div className="social_box">
            <a href="/">
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </a>
            <a href="/">
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </a>
            <a href="/">
              <i className="fa fa-youtube" aria-hidden="true"></i>
            </a>
            <a href="/">
              <i className="fa fa-linkedin" aria-hidden="true"></i>
            </a>
          </div>
          <h5>
            Ziya Fernandez
          </h5>
          <h6 className="">
            Doctor
          </h6>
        </div>
      </div>
    </div>
  </div>
  <div className="btn-box">
    <button className="btn1">
      View All
    </button>
  </div>
</div>
</section>

<section className="contact_section layout_padding">
<div className="container">
  <div className="heading_container">
    <h2>
      Get In Touch
    </h2>
  </div>
  <div className="row">
    <div className="col-md-6">
      <div className="form_container contact-form">
        <form action="">
          <div className="form-row">
            <div className="form_name">
              <div>
                <input type="text" placeholder="Your Name" />
              </div>
            </div>
            <div className="form_ph_num">
              <div>
                <input type="text" placeholder="Phone Number" />
              </div>
            </div>
          </div>
          <div>
            <input type="email" placeholder="Email" />
          </div>
          <div>
            <input type="text" className="message-box" placeholder="Message" />
          </div>
          <div className="btn_box">
            <button>
              SEND
            </button>
          </div>
        </form>
      </div>
    </div>
    <div className="col-md-6 hospital-img">
      <div className=" img-box"> <img src={hospital} alt="hospital img" /></div>
    </div>
  </div>
</div>
</section>


<section className="client_section layout_padding-bottom">
<div className="container">
  <div className="heading_container heading_center ">
    <h2>
      Testimonial
    </h2>
  </div>
  <div id="carouselExample2Controls" className="carousel slide" data-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <div className="row">
          <div className="col-md-11 col-lg-10 mx-auto">
            <div className="box">
              <div className="img-box">
                <img src={client} alt="" />
              </div>
              <div className="detail-box">
                <div className="name">
                  <h6>
                    Alan Emerson
                  </h6>
                </div>
                <p>
                  Enim consequatur odio assumenda voluptas voluptatibus esse nobis officia. Magnam, aspernatur nostrum explicabo, distinctio laudantium delectus deserunt quia quidem magni corporis earum inventore totam consectetur corrupti! Corrupti, nihil sunt? Natus.
                </p>
                <i className="fa fa-quote-left" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="row">
          <div className="col-md-11 col-lg-10 mx-auto">
            <div className="box">
              <div className="img-box">
                <img src={client} alt="" />
              </div>
              <div className="detail-box">
                <div className="name">
                  <h6>
                    Alan Emerson
                  </h6>
                </div>
                <p>
                  Enim consequatur odio assumenda voluptas voluptatibus esse nobis officia. Magnam, aspernatur nostrum explicabo, distinctio laudantium delectus deserunt quia quidem magni corporis earum inventore totam consectetur corrupti! Corrupti, nihil sunt? Natus.
                </p>
                <i className="fa fa-quote-left" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="row">
          <div className="col-md-11 col-lg-10 mx-auto">
            <div className="box">
              <div className="img-box">
                <img src={client} alt="" />
              </div>
              <div className="detail-box">
                <div className="name">
                  <h6>
                    Alan Emerson
                  </h6>
                </div>
                <p>
                  Enim consequatur odio assumenda voluptas voluptatibus esse nobis officia. Magnam, aspernatur nostrum explicabo, distinctio laudantium delectus deserunt quia quidem magni corporis earum inventore totam consectetur corrupti! Corrupti, nihil sunt? Natus.
                </p>
                <i className="fa fa-quote-left" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="carousel_btn-container">
      <a className="carousel-control-prev" href="#carouselExample2Controls" role="button" data-slide="prev">
        <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExample2Controls" role="button" data-slide="next">
        <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
        <span className="sr-only">Next</span>
      </a>
    </div>
  </div>
</div>
</section>


</div>
  )
}

export default Hero;