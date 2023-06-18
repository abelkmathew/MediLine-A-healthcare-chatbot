import React from 'react'

function PatientList({todaysAppointment}) {
  return (
    <div className='patient-list'>
    PatientList
        <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Time Slot</th>
                </tr>
            </thead>
            <tbody>
                { 
            
                  todaysAppointment.map((pat,index) =>{
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
            </tbody>
        </table>
    </div>
  )
}

export default PatientList