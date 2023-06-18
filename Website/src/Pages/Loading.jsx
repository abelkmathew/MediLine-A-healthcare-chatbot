import React,{useState,useEffect,useContext} from 'react'
import ReactLoading from "react-loading";
import {AuthContext} from '../store/Context'
import { collection, doc, getDoc, getDocs, query, where,docs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useHistory } from 'react-router-dom';
import DoctorApp from './DoctorApp';

function Loading() {
  const {user} = useContext(AuthContext)
  
  const [doctorDetails, setDoctorDetails] = useState({})
  const [todaysAppointment, setTodaysAppointment] = useState([])
  const [done, setDone] = useState(undefined);

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  date=formatDate(date)
  console.log(date);
  date="2022-06-29"


    // const getDoctor = async () => {
    //     const doctorRef=doc(db,"Doctors",user.uid.toString());
    //     const currentDoctorDetails = await getDoc(doctorRef)
    //     setDoctorDetails(currentDoctorDetails.data())
    // }

    const getAppointments = async () => {
        const AppointmentCollectionRef = collection(db, "Appointment");
        const AppointmentQuery = query(AppointmentCollectionRef, where("doctor_id", "==", parseInt(user.uid)),where("date","==",date));
        const querySnapshot = await getDocs(AppointmentQuery);
        const appointments = querySnapshot.docs.map(doc => doc.data());
        appointments.sort(function(a, b) {
            // get time time from string 
            // then get am or pm from string and append
            // both can be done using slice method
            return Date.parse('1970/01/01 ' + a.time.slice(0, -2) + ' ' + a.time.slice(-2)) - Date.parse('1970/01/01 ' + b.time.slice(0, -2) + ' ' + b.time.slice(-2))
          });
        setTodaysAppointment(appointments);
        setDone(true);
    }


    useEffect(() => {
        setTimeout(() => {
            // fetch("https://jsonplaceholder.typicode.com/posts")
            //   .then((response) => response.json())
            //   .then((json) => {
                //     console.log(json);
                //     setData(json);
                //   });
                // getDoctor();
                getAppointments();
                
          }, 2500);
    }, []);



  return (
    <div>
            <> 
      {!done ? (
        <div style={{display:"flex", alignText:"center", justifyContent:"center" }}>
          <ReactLoading
            type={"bars"}
            color={"#62d2a2"}
            height={100}
            width={100}
            
          />
        </div>
        
      ) : 
       <DoctorApp todaysAppointment={todaysAppointment} date={date} />
      }
    </>
    </div>
  )
}

export default Loading









