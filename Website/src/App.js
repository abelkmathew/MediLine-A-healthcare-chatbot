import React,{useContext,useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from './Pages/Contact';
import Doctor from './Pages/Doctor';
import Departments from './Pages/Departments';
import Navigation from './components/Navigation';
import Login from './Pages/Login';
import Footer from './components/Footer';
import Bot from './components/bot/Bot';
import DoctorApp from './Pages/DoctorApp';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import './responsive.css'
import CurrentPatientContext from './store/CurrentPatientContext';
import { getAuth,onAuthStateChanged} from "firebase/auth"
import {AuthContext} from './store/Context'
import Loading from './Pages/Loading';



function App() {

  const {user, SetUser} = useContext(AuthContext)
  const auth=getAuth();

  useEffect(()=>{
      console.log('hi this is',user)
      onAuthStateChanged(auth,(user)=>{
          SetUser(user)
          const uid =user.id
          console.log('Current user is',uid)
      })
  })

  return (
    <div className="App">
      {/* <Router>
        <Navigation/>
        <Switch> 
          <Route path="/" exact component={() => <Home /> } />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/departments" exact component={() => <Departments />} />
          <Route path="/doctor" exact component={() => <Doctor />} />
          <Route path="/contact" exact component={() => <Contact />} />
          <Route path="/login" exact component={() => <Login />} />
          <Route path="/doctorapp" exact component={() => <DoctorApp/>} />
        </Switch>
        <Bot />
        <Footer/>
      </Router> */}
      <Router> 
        <Switch> 
          <Route path="/" exact >
            <Navigation/>
            <Home /> 
            <Bot />
            <Footer/>
          </Route>
          <Route path="/about">
            <Navigation/>
            <About /> 
            <Bot />
            <Footer/>
          </Route>
          <Route path="/departments">
            <Navigation/>
            <Departments /> 
            <Bot />
            <Footer/>
          </Route>
          <Route path="/doctor">
            <Navigation/>
            <Doctor /> 
            <Bot />
            <Footer/>
          </Route>
          <Route path="/contact">
            <Navigation/>
            <Contact /> 
            <Bot />
            <Footer/>
          </Route>
          <Route path="/login" exact >
            <Navigation/>
            <Login/> 
            <Footer/>
          </Route>
          <CurrentPatientContext>  
            <PrivateRoute exact path="/doctorapp" component={DoctorApp} >
              </PrivateRoute>
              <PrivateRoute exact path="/loading" component={Loading} >
              </PrivateRoute>
          </CurrentPatientContext>
          
          {/* <Route path="/doctorapp"> */}
                {/* <Navigation/>
                <DoctorApp /> 
                <Footer/>  */}
          {/* </Route> */}

        </Switch>
      </Router>



    </div>
  );
}

export default App;
