import React, { useEffect, useState } from 'react'
import SlotButton from './schedule_components/SlotButton'
import './schedule_components/schedule.css'

import { collection, doc, getDoc, getDocs, query, where,docs } from 'firebase/firestore';
import { db } from '../../firebase/config';



function Schedule({doctorDetails,user_uid}) {
  const [docAppointment,setDocAppointment] =useState([])
  const [done,setDone]=useState(false)
  const [date,setDate]=useState("")
  const getDocAppointments = async () => {
    const AppointmentCollectionRef = collection(db, "Appointment");
    const AppointmentQuery = query(AppointmentCollectionRef, where("doctor_id", "==", parseInt(user_uid)),where("date","==",date));
    const querySnapshot = await getDocs(AppointmentQuery);
    const appointments = querySnapshot.docs.map(doc => doc.data());
    appointments.sort(function(a, b) {
        // get time time from string 
        // then get am or pm from string and append
        // both can be done using slice method
        return Date.parse('1970/01/01 ' + a.time.slice(0, -2) + ' ' + a.time.slice(-2)) - Date.parse('1970/01/01 ' + b.time.slice(0, -2) + ' ' + b.time.slice(-2))
      });
    setDocAppointment(appointments);
    setDone(true);
}

useEffect(()=>{
  getDocAppointments()
})





  return (
    <div className="schedule row">
      <div className="date-slot col-md-10">
        <div className="dates">
          <div className="btn-group">
            <button className='btn btn-secondary' onCli>Mon<br/>24-05</button>
            <button className='btn btn-secondary'>Tue<br/>25-05</button>
            <button className='btn btn-secondary'>Wed<br/>26-05</button>
            <button className='btn btn-secondary'>Thur<br/>27-05</button>
            <button className='btn btn-secondary'>Fri<br/>24-05</button>
            <button className='btn btn-secondary'>Sat<br/>24-05</button>
            <button className='btn btn-secondary'>Sun<br/>24-05</button>
          </div>
        </div>
        <div className='flex' >
        { 
            
            docAppointment.map((pat,index) =>{
              return (
                      <tr>
                        {/* {index => index+1} */}
                        <th scope="row">{index+1}</th>
                        <td>{pat.patient_name}</td>
                        <td>{pat.time}</td>
                      </tr>

              )
            })
          }
          <SlotButton timeslot='9:45'/>
          <SlotButton timeslot='9:45'/>
          <SlotButton timeslot='9:45'/>
          <SlotButton timeslot='9:45'/>
          <SlotButton timeslot='9:45'/>
          <SlotButton timeslot='9:45'/>
          <SlotButton timeslot='9:45'/>
          <SlotButton timeslot='9:45'/>
          <SlotButton timeslot='9:45'/>
          <SlotButton timeslot='9:45'/>
          <SlotButton timeslot='9:45'/>
          <SlotButton timeslot='9:45'/>
          <SlotButton timeslot='9:45'/>
          <SlotButton timeslot='9:45'/>
          <SlotButton timeslot='9:45'/>
        </div> 
      </div>
      {/* <div className="total-slot col-md-2">
        <div className="card">
          <div className="card-title">Total</div>
          <div className="card-body">20</div>
        </div>
      </div> */}
    </div>

  )
}

export default Schedule

