import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './services/userContext';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


// COMPONENTS
import Main from './Main';

import './styles/global.css';
import SignIn from './SignIn';
import Register from './Register'
import PrivateRoute from './PrivateRoute';
import FourOhFour from './sub-components/FourOhFour';
import AddCardForm from './addCardForm';

export default function App() {
  
  return (
    
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <AuthProvider>
        <Switch>
        
        <Route exact path='/login'>
          
          <SignIn />
             
        </Route>

        <Route exact path='/register'>
          
          <Register />
          
        </Route>

        <PrivateRoute exact path='/' component={Main} />
        
        <PrivateRoute exact path='/addcard' component={AddCardForm} />
          

        <Route path='*'>
          
          <FourOhFour />
          
        </Route>
      </Switch>

      </AuthProvider>
      </Router>
    </MuiPickersUtilsProvider>
    
  )
}
