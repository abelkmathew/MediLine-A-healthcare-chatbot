import React,{useEffect, useState,useRef,useContext} from 'react';
import './patientstyle.css'
import { db } from '../../../firebase/config';
import { setDoc,doc, updateDoc, arrayUnion,arrayRemove } from 'firebase/firestore';
import { AuthContext } from '../../../store/Context';

function PatientDetails({patientDetails,todaysAppointment,currentPatient,setCurrentPatient,patientCount,setPatientCount,date}) {

const [load,setLoad]=useState(true);
// const [filtered,setFiltered]=useState([]);
const doctorNote = useRef();
const {user} = useContext(AuthContext)


const handlePrevious = () => {
    
    if (patientCount > 0 ) {
        setPatientCount(patientCount - 1)
    }
    else{
        setPatientCount(patientCount)
    }
    
}
const handleNext = () => {
    if (patientCount < todaysAppointment.length-1 ) {
        setPatientCount(patientCount + 1)
    }
    else{
        setPatientCount(patientCount)
    }
    
}

const submitNote = () =>{
   
    currentPatient.history.filter(hist => hist.doctor_id === parseInt(user.uid) && hist.date===date).map(sym => {
    const data1={
        date:sym.date,
        doctor_id:sym.doctor_id,
        doctor_name:sym.doctor_name,
        prediction:sym.prediction,
        symptom_List:sym.symptom_List
    }
    const data={
        date:sym.date,
        doctor_id:sym.doctor_id,
        doctor_name:sym.doctor_name,
        prediction:sym.prediction,
        symptom_List:sym.symptom_List,
        doctor_note:doctorNote.current.value
    }
    
    updateDoc(doc(db, "Patients", currentPatient.patient_id.toString()), {
        history:arrayRemove(data1)
       

            },{merge:true}).then(()=>{
            updateDoc(doc(db, "Patients", currentPatient.patient_id.toString()), {
                history:arrayUnion(data)
                    },{merge:true}).then(()=>{
                    alert("Note added");
                    });
            });
   
    })
        


                 
    // data={
    //     doctor_note:doctorNote.current.value
    //     date:
    //     doctor_id:
    //     doctor_name:
    //     prediction:
    //     symptom_List:
    // }
    console.log(doctorNote.current.value)
    
  }
  const getFiltered = () =>{
    setLoad(true)
    // console.log('boys',currentPatient.history)
    // console.log('heji',user.uid)
    const hh=currentPatient.history
    hh.filter( hist => hist.doctor_id === user.uid).map(sym=>{
                // return (<p>{sym}</p>)   
                console.log('ji',sym.doctor_name)
            }) 
   

    // console.log('yobo',filtered)
    // filtered.history[0].symptom_List.map(sym=>{
    //     return (<p>{sym}</p>)   }) 
    
    setLoad(false)
    
}
useEffect(()=>{
    setCurrentPatient(patientDetails[patientCount]);
    // getFiltered()
    setLoad(false)
  },[patientCount])
  
// useEffect(()=>{
// // const filtered = currentPatient.history.filter( hist => hist.doctor_id === user.uid ); 
// //   setFiltered(filtered)
// //   getFiltered()
// },[])

 {/* const filtered1 = housewiseList.filter( student => student.captain === true && (student.grp_count + student.ind_count <= 3)); */}
                                {/* currentPatient.history[(currentPatient.history.length)-1].symptom_List.map(sym=>{
                                        return (<p>{sym}</p>)   }) */}

  return (
    <div className='patient'>
        <div className='Patient-tile row'>    
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">{currentPatient.patient_name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{currentPatient.patient_id}</h6>
                    <div className="card-items">
                        <div className="row">
                            <div className="col-md-4 col-6">
                                <div className="col-item age"><b>Age:</b> <br /> {currentPatient.age}</div>
                            </div><br />
                            <div className="col-md-4 col-6">
                                <div className="col-item gender"><b>Gender:</b> <br />{currentPatient.gender}</div>
                            </div><br />
                            <div className="col-md-4 col-6">
                                <div className="col-item contact"><b>Contact Number:</b><br />{currentPatient.mobile_number}</div>
                            </div> <br />
                            <div className="col-md-6 col-6">
                                <div className="col-item slot-time"><b>Time:</b> <br />{todaysAppointment[patientCount].time}</div>
                            </div><br />
                            <div className="col-md-6 col-6">
                                <div className="col-item date-slot"><b>Date of Appointment:</b><br />{todaysAppointment[patientCount].date}</div>
                            </div><br />


                        </div>
                        <div className="second-row row">
                            <div className="col-md-6 col-6 symptoms" >
                                <b>Symptoms</b>
                                {/* getFiltered() */}
                             {load? <p>No Data Available!!!</p>:
                                    <div>
                                        {currentPatient.history.filter(hist => hist.doctor_id === parseInt(user.uid) && hist.date===date).map(sym => (
                                            <p>
                                            {sym.symptom_List.map(itm=>(
                                                itm+` ,`
                                        ))}
                                            </p>
                                        ))}
                                        </div>
                             }
                                
                                
                            </div>
                            <div className="col-md-6 col-6 primary-prediction">
                                <b>Primary Prediction</b> <br />
                                {/* {load?<p>getting</p>:currentPatient.history[0].prediction} */}
                                {load? <p>No Data Available!!!</p>:
                                    <div>
                                        {currentPatient.history.filter(hist => hist.doctor_id === parseInt(user.uid) && hist.date===date).map(sym => (
                                            <p>
                                            {sym.prediction}
                                            </p>
                                        ))}
                                        </div>
                             }
                             
                               
                            </div>
                        </div>
                        <textarea class="form-control" ref={doctorNote} placeholder='Type your note.........' aria-label="With textarea"/>
                        <div className="note-submit">
                            <button onClick={handlePrevious} type="button" className='btn btn-primary previous'><i class="bi bi-arrow-left"></i>Previous</button>
                            <button type="button" className='btn btn-success' onClick={submitNote}><i class="bi bi-plus-circle"></i> Add Note</button>
                            <button onClick={handleNext} type="button" className='btn btn-primary next'>Next<i class="bi bi-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PatientDetails