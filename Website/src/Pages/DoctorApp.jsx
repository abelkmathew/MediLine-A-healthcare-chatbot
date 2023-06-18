import React,{useState,useEffect,useContext} from 'react'
import './doctorapp.css'
import Dashboard from '../components/DoctorPages/Dashboard';
import DoctorProfile from '../components/DoctorPages/DoctorProfile';
import Patient from '../components/DoctorPages/Patient';
import Schedule from '../components/DoctorPages/Schedule';
import {AuthContext} from '../store/Context'
import { useHistory } from 'react-router-dom';
import { getAuth, signOut} from "firebase/auth"
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { db } from '../firebase/config';
import { collection, doc, getDoc, getDocs, query, where,docs } from 'firebase/firestore';





function DoctorApp( {todaysAppointment,date}) {

    const [active, setActive] = useState("Dashboard");
    const {user} = useContext(AuthContext)
    const [doctorDetails, setDoctorDetails] = useState({})
    const [currentPatient,setCurrentPatient]=useState({});
    const [patientCount,setPatientCount]=useState(0);
    const [patientDetails,setPatientDetails] =useState([])



    const history = useHistory()
    const auth=getAuth();
    
    
    const getDoctor = async () => {
        const doctorRef=doc(db,"Doctors",user.uid.toString());
        const currentDoctorDetails = await getDoc(doctorRef)
        setDoctorDetails(currentDoctorDetails.data())
    }

    const getPatient = async () => {
        todaysAppointment.map(async (pat,index) =>{
            const PatientRef=doc(db,"Patients",pat.patient_id.toString());
            const PatientDetails = await getDoc(PatientRef);
            setPatientDetails(oldArray => [...oldArray,PatientDetails.data()]);
        
        })
       
    }

    const handleLogout = (e)=>{
        signOut(auth).then((e)={
        })
        history.push('/login')                                                   
    }



    useEffect(() => {
        getDoctor();
        getPatient();

    }, []);
  
    return (
    <div>
        <Navigation/>
        <div className="doctor-app">
            <div className="container ">
                <div className="row">
                {console.log('dp',patientDetails)}
                    <div className="col-md-3 col-12 col-sm-12">
                        <div className='control-panel'>
                            <div className="doctor-name">
                            <h6>Hi,</h6>
                            <h5>Dr. {user.displayName}</h5>
                            </div>

                            <div className="control-panel-btn ">
                                <ul>
                                    <li className={'btn-item '}><div className='control-btn' onClick={() => setActive("Dashboard")}>Dashboard</div> </li>
                                    <li className={'btn-item '}><div className='control-btn' onClick={() => setActive("Patient")}>Current Patient</div></li>
                                    {/* <li className={'btn-item '}><div className='btnfdf'  onClick={() => setActive("Schedule")}>Schedule</div></li> */}
                                    <li className={'btn-item '}><div className='btnfdf' onClick={() => setActive("DoctorProfile")}>Profile</div></li>
                                </ul>
                            </div>
                            <div className="logout-btn">
                            <button type="button" className='btn btn-danger' onClick={handleLogout}>
                            Logout</button></div>
                            
                        </div>
                    </div>      
                    <div className="col-md-9 col-sm-12 col-12 ">
                        {active ==="Dashboard" && <Dashboard active={active} setActive={setActive} patientCount={patientCount} todaysAppointment={todaysAppointment} date={date} currentPatient={currentPatient} />}
                        {active ==="Patient" && <Patient patientDetails={patientDetails} currentPatient={currentPatient} date={date} setCurrentPatient={setCurrentPatient} todaysAppointment={todaysAppointment} patientCount={patientCount} setPatientCount={setPatientCount}/>}
                        {/* {active ==="Schedule" && <Schedule doctorDetails={doctorDetails} user_uid={user.uid} />} */}
                        {active ==="DoctorProfile" && <DoctorProfile doctorDetails={doctorDetails} />}
                        
                        
                        
                    </div>
                </div>
            </div>  
        </div>
        <Footer/>
    </div>
  )
}

export default DoctorApp