import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from './services/userContext';



export default function PrivateRoute({ component: Component, ...rest }) {
  
  const { currentUser } = useAuth()
  return (
    <Route
    
      {...rest} 
      render={props => {
        if (!currentUser) {
          return <Redirect to="/login" />
          
        } else {
          return <Component {...props} />
        }
         
      }
      }/>
  )
}