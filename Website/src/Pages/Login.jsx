import React, { useContext, useState } from 'react';
import {FirebaseContext } from '../store/Context'
import './login.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useHistory } from 'react-router-dom';

function Login() {
  const [email,setEmail] =useState('')
  const [password, setPassword] = useState('')
  const {firebase} = useContext(FirebaseContext)
  const auth = getAuth();
  const history = useHistory()
  const handleLogin = (e)=>{
    e.preventDefault()
    console.log(firebase)
    signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{
    // firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      // alert('Login Success')
      history.push('/loading')
      const user = userCredential.user;
      console.log('login success')
    }).catch((error)=>{
      alert(error.message)
      console.log('Error')
      console.log(error.message)
    })

  }

  
  return (
    <div className='site-section'>
      <div className="loginParentDiv">
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            onChange={(e)=> setEmail(e.target.value)}
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            onChange={(e)=> setPassword(e.target.value)}
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
