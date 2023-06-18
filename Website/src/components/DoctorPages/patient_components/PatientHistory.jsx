import React, { useEffect, useState } from 'react'

function PatientHistory({currentPatient}) {
const [load,setLoad]=useState(true)
useEffect(()=>{
    if(currentPatient){
        setLoad(false)
        
    }
    else{
        setLoad(true)
    }
},[currentPatient])
  return (
    <div>
        <div className="accordion" id="accordionPanelsStayOpenExample">
        {/* {console.log(currentPatient.history)} */}
            {load?<p>Fetching</p>:currentPatient.history.map((item)=>{
                return(
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                           {item.date}
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body">
                            <b>Doctor Name:</b><p>{item.doctor_name}</p>
                            <b>Primary Prediciton:</b><p>{item.prediction}</p>
                            <b>Doctor Note:</b><p>{item.doctor_note}</p>
                            <b>Symptoms:</b><p>
                            {load? <p>No Data Available!!!</p>:
                                    <div>
                                        {/* {currentPatient.history.map(sym => ( */}
                                            <p>
                                            {item.symptom_List.map(itm=>(
                                                itm+` ,`
                                        ))}
                                            </p>
                                        {/* ))} */}
                                        </div>
                             }
                             </p>
                        </div>
                        </div>
                    </div>
                )
            })}
            
            
        </div>
    </div>
  )
}

export default PatientHistory