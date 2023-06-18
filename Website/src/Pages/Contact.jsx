import React from 'react'
import hospital from '../Assets/hospital.jpg'

function Contact() {
  return (
    <div className='contact'>
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
                <div className="">
                  <div>
                    <input type="text" placeholder="Your Name" />
                  </div>
                </div>
                <div className="">
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
    </div>
  )
}

export default Contact;