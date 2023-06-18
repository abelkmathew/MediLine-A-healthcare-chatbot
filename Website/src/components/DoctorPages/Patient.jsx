import React, { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import PatientDetails from './patient_components/PatientDetails'
import PatientHistory from './patient_components/PatientHistory'
import './patient_components/patientstyle.css'
import calenderpng from '../../Assets/calendar-png-icon.jpg'

function Patient({patientDetails,todaysAppointment,currentPatient,setCurrentPatient,patientCount,setPatientCount,date}) {


  const [value, setValue] = useState(new Date());

  useEffect(() => {
  const interval = setInterval(() => setValue(new Date()), 1000);
  
  return () => {
    clearInterval(interval);
  };
}, []);

const [dateState, setDateState] = useState(new Date());
useEffect(() => {
  setInterval(() => {
    setDateState(new Date());
  }, 30000);
 
  setCurrentPatient(patientDetails[patientCount])
   
}, []);



  return (
    <div>
      <div className="row"> 
        <div className="col-md-9 col-sm-12">
          <PatientDetails currentPatient={currentPatient} date={date} setCurrentPatient={setCurrentPatient} patientDetails={patientDetails} todaysAppointment={todaysAppointment} patientCount={patientCount} setPatientCount={setPatientCount}/>
        </div>
        {/* <div className="col-md-1 col-sm-12"></div> */}
        <div className="date-time col-md-3 col-sm-12">
          <p>Current Time:</p>
          <div className="clock">
            <Clock value={value} renderNumbers={true}/>
          </div>

          <div className="current-date">
            <div className='card'>
              <div className="card-title"><img className='calenderimg' src={calenderpng}></img><t>Date</t></div>
              <div className="date-body">
                
                {' '}
                {dateState.toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>
        </div>
      </div> 
      <div className="patient-history">
        <PatientHistory currentPatient={currentPatient}/>
      </div>
        
    </div>
  )
}

export default Patient