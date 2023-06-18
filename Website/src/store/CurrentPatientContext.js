import { createContext ,useState} from  'react'

export const CurrentPatientContext = createContext(null)


function PatientNow ({children}){
    const [currentPatientDetails,setCurrentPatientDetails] = useState(null)
    return(
        <CurrentPatientContext.Provider value={{currentPatientDetails,setCurrentPatientDetails}}>
            {children}
        </CurrentPatientContext.Provider>
    )
}

export default PatientNow