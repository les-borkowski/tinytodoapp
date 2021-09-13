import React, { useState } from 'react'
import { Container, Grid, Button, Typography, Box, TextField, Paper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from './services/userContext';
import { useHistory } from 'react-router-dom';

import { KeyboardDatePicker } from '@material-ui/pickers';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

// firebase
import { writeCard } from './services/dbFunctions';


export default function AddCardForm() {

  const { currentUser } = useAuth()
  const history = useHistory();

  // state for the forms
  const [title, setTitle] = useState("")
  const [descr, setDescr] = useState("")

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  

  // date for the datepicker
  const [selectedDate, handleDateChange] = useState(new Date());

  // add new card functions
  async function AddCard(e) {
    e.preventDefault();
        
    try {
      setLoading(true)
      writeCard(currentUser.email, title, descr, selectedDate);
    } catch {
      setError("Error");
    }


    // clear state after posting and close modal
    setTitle("")
    setDescr("")
    
    // redirect to main
    setLoading(false)
    history.push('/')
}

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
  inputField: {
    margin: theme.spacing(2, 0, 1),
  },

}))

const classes = useStyles();
  return (

    <Container className={classes.root} maxWidth={"md"}>
      <Paper>
      <Box p={2}>
      
      <Grid container direction="row" alignItems="center" justifyContent="center">
        <Grid item>
          <AddCircleOutlinedIcon 
            color="secondary"
            fontSize="large"
          />
        </Grid>

        <Grid item>
          <Typography variant="h6">Add New Task</Typography>
        </Grid>
      </Grid>
      
      <form className={classes.form} noValidate autoComplete="off">

      { error && <Alert variant="outlined" severity="error"> { error }</Alert>}

      <TextField 
        id="title" 
        value={title} 
        label="Title" 
        variant="outlined" 
        onChange={(e) => setTitle(e.target.value)} 
        fullWidth
        className={classes.inputField}
        />

      <TextField 
        id="description" 
        value={descr} 
        label="Descritpion" 
        variant="outlined" 
        onChange={(e) => setDescr(e.target.value)} 
        fullWidth multiline
        className={classes.inputField}
        />

      <KeyboardDatePicker 
        inputVariant="outlined"
        label="Deadline:"
        value={selectedDate}
        format="dd/MM/yyyy" 
        onChange={handleDateChange}
        className={classes.inputField} 
        />      
      
      <Button 
      disabled={loading}
      type="submit" 
      variant="contained" 
      color="secondary" 
      value="Submit" 
      onClick={(e) => AddCard(e)} 
      fullWidth 
      className={classes.submit}
      >Add Task</Button>

      </form>

      </Box>
      </Paper>
    </Container>
  

  
  )
}
