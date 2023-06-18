import React from 'react'
import './profile_components/profile.css'
import profile from '../../Assets/profile.png'

function DoctorProfile({doctorDetails}) {
  return (
    <div className='doctor-profile'>
      <div className="topnav">
          <h2><center><p>DOCTOR PROFILE</p> </center></h2>
        </div>

    <div >
      <br/> 
      <div className="row">
       
        <div className="card  doctor-details col-md-7 col-sm-12 col-12">
        <div className="card-body">

        <p>ID: {doctorDetails.doctor_id }</p>	
        <p>NAME:{doctorDetails.doctor_name}</p>
        <p>Department: {doctorDetails.dept_name} </p> 
        <p>Description: {doctorDetails.doctor_desc} </p> 
        </div>

        </div>
        <div className="col-md-1 col-sm-12 col-12"></div>
        <div className="profile-img col-md-4 col-sm-12 col-12">
          <img src={profile} />
        </div>
      </div>
     
    </div>    
    </div>
  )
}

export default DoctorProfile