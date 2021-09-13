import React, { useState } from 'react'
import { Box, Button, Paper, Container, CssBaseline, Grid, Typography, makeStyles, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';

import { useAuth } from './services/userContext'
import { addUsersCol } from './services/dbFunctions';


//  TODO: database entry

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  

}))

export default function Register() {
  const classes = useStyles();

  // const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { signup, currentUser } = useAuth();
  
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    // form validation here
    if(password !== password2) {
      
      setError("Passwords do not match");
      
    } else if (password.length < 6) {
      setError("Password length: min 6 chars");
    }
    try {
      setLoading(true)
      setError("")
      await signup(email, password);
      console.log("User registered")
      // currentUser && addUsersCol(currentUser.email);
      
    } catch {
      setError("Account Creation failed");
      setLoading(false)
    }
    // create new collection for users data after succesful registration
    currentUser && addUsersCol(currentUser.email);
    setLoading(false)
    history.push("/")
    
      
  }

  return (
    <Container className={classes.root} maxWidth="xs">
      <CssBaseline />
      <Paper>
        <Box p={2}>
        
        <Grid container direction="row" alignItems="center" justifyContent="center">
          <Grid item>
            <CreateNewFolderIcon 
              color="secondary"
              fontSize="large"
            />
          </Grid>

          <Grid item>
            <Typography variant="h6">Register</Typography>
          </Grid>
        </Grid>

      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        { error && <Alert variant="outlined" severity="error"> { error }</Alert>}
        
      
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <TextField
          
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password2"
          label="Confirm Password"
          type="password"
          id="password2"
          autoComplete="current-password"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
        />
                
        <Button
          disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          Register
        </Button>

      </form>

      
      </Box>
      </Paper>
    </Container>
  )
}
