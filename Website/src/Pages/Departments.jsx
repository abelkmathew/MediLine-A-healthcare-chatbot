import React from 'react'
import s1 from '../Assets/s1.png'
import s2 from '../Assets/s2.png'
import s3 from '../Assets/s3.png'
import s4 from '../Assets/s4.png'
import { Link } from 'react-router-dom'


function Departments() {
  return (
    <div>
      <section className="department_section layout_padding">
    <div className="department_container">
      <div className="container ">
        <div className="heading_container heading_center">
          <h2>
            Our Departments
          </h2>
          <p>
            Asperiores sunt consectetur impedit nulla molestiae delectus repellat laborum dolores doloremque accusantium
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
                  fact that a reader will be distracted by the readable page when looking at its layout.
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
                  Diagnosis
                </h5>
                <p>
                  fact that a reader will be distracted by the readable page when looking at its layout.
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
                  Surgery
                </h5>
                <p>
                  fact that a reader will be distracted by the readable page when looking at its layout.
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
                  First Aid
                </h5>
                <p>
                  fact that a reader will be distracted by the readable page when looking at its layout.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-box">
          <Link to='/departments'>View All</Link>
        </div>
      </div>
    </div>
  </section>
    </div>
  )
}

export default Departments