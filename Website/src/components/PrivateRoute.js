import {React,useContext} from "react"
import { Route, Redirect } from "react-router-dom"
// import { useAuth } from "../contexts/AuthContext"
import {AuthContext} from '../store/Context'
export default function PrivateRoute({ component: Component, ...rest }) {
//   const { currentUser } = useAuth()
  const {user} = useContext(AuthContext)

  return (
    <Route
      {...rest}
         
      render={props => {
        console.log('Im',user)
        return user ? <Component {...props} /> : <Redirect to="/login" />
      }}
    >
    </Route>
  )
}