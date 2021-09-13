import React, { useState } from 'react'
import { Box, Button, Grid, Paper, Container, CssBaseline, Typography, makeStyles, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import LockOpenIcon from '@material-ui/icons/LockOpen';


import { useAuth } from './services/userContext';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

}))

export default function SignIn() {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login, currentUser } = useAuth();
  const history = useHistory();

  // SING IN WITH EMAIL
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("")
      await login(email, password);
      setLoading(true)
      history.push("/")
    } catch {
      setError("Login failed");
    }
    setLoading(false)  
  }

  async function handleDemoLogin(e) {
    e.preventDefault();
    try {
      setError("")
      await login(process.env.REACT_APP_demoUserLogin, process.env.REACT_APP_demoUserPass);
      setLoading(true)
      history.push("/")
    } catch {
      setError("Login failed");
    }
    setLoading(false)  
  }

  function handleRegister(e) {
    e.preventDefault();
    history.push('/register')
  }


  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="xs">
      <CssBaseline />
      <Paper>
        <Box p={2}>
        
        <Grid container direction="row" alignItems="center" justifyContent="center">
          <Grid item>
            <LockOpenIcon 
              color="primary"
              fontSize="large"
            />
          </Grid>

          <Grid item>
            <Typography variant="h6">Sign In</Typography>
          </Grid>
        </Grid>

      <form className={classes.form} noValidate onSubmit={handleSubmit}>

        { error && <Alert variant="outlined" severity="error"> { error }</Alert>}
        {/* Show current user for testing purposes */}
        { currentUser && <Alert variant="outlined" severity="info"> { JSON.stringify(currentUser.email) }</Alert>}

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
        <Button
          disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        
        </form>

        <Button
          disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          color="default"
          className={classes.submit}
          onClick={handleDemoLogin}
        >
          Demo User
        </Button>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          onClick={handleRegister}
        >
          Create Account
        </Button>
        
      

      
      </Box>
      </Paper>
    </Container>
  )
}
