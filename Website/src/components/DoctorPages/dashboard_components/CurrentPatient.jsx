import React,{useState,useEffect,useContext} from 'react'
import { AuthContext } from '../../../store/Context';
function CurrentPatient({active,setActive,currentPatient,todaysAppointment,patientCount,date}) {
  const [load,setLoad]=useState(true)

  useEffect(()=>{
    if(currentPatient){
    
        setLoad(false)
        
    }
    else{
        setLoad(true)
    }
},[currentPatient])
const {user} = useContext(AuthContext)


  return (
    <div className='Patient-tile'>
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">{currentPatient.patient_name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{currentPatient.patient_id}</h6>
                <div className="card-items">
                  <div className="row">
                    <div className="col-md-4 ">
                      <div className="age">Age <br /> {currentPatient.age}</div>
                    </div>

                  <div className="col-md-4">
                    <div className="gender">Gender <br /> {currentPatient.gender}</div>
                    </div>
            
                  <div className="col-md-4">
                    <div className="slot-time">Slot Time <br />{load ? <p>Not Available!!</p> : todaysAppointment[patientCount].time}</div>
                    </div>
                  
                  </div>
                    <div className="symptoms">
                      Symptoms List <br />
                      {/* {load? <p>Not Available!!</p>:
                                currentPatient.history[(currentPatient.history.length)-1].symptom_List.map(sym=>{
                                        return (<p>{sym}</p>)   })
                      } */}
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
                    <div className="primary-prediction">
                      Primary Prediction <br />
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
                  <button className='btn btn-primary' onClick={() => setActive("Patient")}>View</button>
                </div>

            </div>
        </div>
   
  )
}

export default CurrentPatient