import React,{useState,useEffect} from 'react';
import './dashboard_components/dashboard.css';
import Smallcard from './dashboard_components/Smallcard';
import PatientList from './dashboard_components/PatientList';
import CurrentPatient from './dashboard_components/CurrentPatient';
import  {db} from '../../firebase/config'
import { getDoc,doc } from 'firebase/firestore';
import TimeComponent from './TimeComponent';

function Dashboard({todaysAppointment,active,setActive,currentPatient,patientCount,date}) {
  const current = new Date();
  const date1 = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;
  const [load,setLoad]=useState(true);
  useEffect(()=>{
    setLoad(false)
  },[currentPatient])


  return (
    <div className="dashboard ">
    <div className="dashboard-card row">   
      <div className="small-card col"><Smallcard icon="bi bi-calendar-event-fill" title="Appointments" value={todaysAppointment.length}/></div>
      <div className="small-card col "><Smallcard icon="bi bi-people-fill" title="Completed" value={patientCount}/></div>
      <div className="small-card col"><Smallcard icon="bi bi-calendar-month-fill" title="Date" value={date1}/></div>
      <div className="small-card col "><TimeComponent/></div>
    </div>
    <div className="bottom-row row">
      <div className="col-md-5">
        <PatientList todaysAppointment={todaysAppointment} />
      </div>
      <div className="col-md-1 col-sm-12 col-12"></div>
      <div className="col-md-6 ">
       {/* {load?<p>No data Available!!!</p>

       :<CurrentPatient active={active} todaysAppointment={todaysAppointment} date={date} setActive={setActive} currentPatient={currentPatient} patientCount={patientCount}/>
       }  */}
      </div>
    </div>
  </div>
  )
}

export default Dashboard
