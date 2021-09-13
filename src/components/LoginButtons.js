import React from 'react'
import { Button, ButtonGroup, Grid, Typography, makeStyles } from '@material-ui/core'
import { useAuth } from './services/userContext'
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles(() => ({
  menuButton: {
    marginRight: 24,
  },
}))

export default function LoginButtons() {

  const {currentUser, logout} = useAuth();

  const classes = useStyles();
  
  function LoginBtns() {
    return (
      <ButtonGroup>
          <Link to='/login'>
            <Button
              type="submit" 
              fullWidth
              variant="contained"
              color="secondary"
            >
              Login
            </Button>
          </Link>
          <Link to='/register'>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
            >
              Register
            </Button>
          </Link>
          </ButtonGroup>
    )
  }

  function SignOutBtn() {

    return currentUser && (
      <Grid container direction="row" alignItems="center" justifyContent="center">
        <Typography 
          variant='button'
          className={classes.menuButton}
        >
        {currentUser.email}
        </Typography>
        
        <Button variant="contained" color="secondary" onClick={logout}>
          <LockOutlinedIcon />
        </Button>
     </Grid>   
      
    )
  }
  return (
    <Grid container 
      alignItems='center'
      justifyContent='space-between'
      >
      <Grid item>
        <Typography variant="h6">
          Tiny To Do App
        </Typography>  
      </Grid>

      <Grid item>
        { currentUser ? <SignOutBtn /> : <LoginBtns />}           
      </Grid>
    </Grid>
  )
}
