import React, { useState } from 'react'
import { Box, CssBaseline, Grid, makeStyles, Card, CardActions, CardContent, Button, Typography, ButtonGroup, Paper, FormControlLabel, Checkbox } from '@material-ui/core';
import ModalMUI from './sub-components/Modal';
import { deleteDoc, setCheckbox } from './services/dbFunctions';
import { useAuth } from './services/userContext';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';



const useStyles = makeStyles({
  root: {
    minWidth: 300,
    
  },
    
});

export default function MemCard(props) {

  const { currentUser } = useAuth();
  const cardID = props.id
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(props.complete);
  
  

  // modal handlers
  const handleOpen = () => {
    setShow(true);
  }
  const handleClose = () => {
    setShow(false);
  }

  // delete document
  const handleYesAction = () => {
    deleteDoc(currentUser.email, cardID);
    handleClose();
  }

  const handleCheck = () => {
    // change value
    let checkValue = !checked;
    setChecked(checkValue);
    console.log('app', checkValue)
    // update db - set timeout to prevent too many updates
    setTimeout(setCheckbox(currentUser.email, cardID, checkValue), 1000)
    // setCheckbox(currentUser.email, cardID, checkValue);
  }

  const classes = useStyles();

  return (
 
    <>
    <CssBaseline />
    <Card className={classes.root} id={props.id}>
      <CardContent>

        <Grid container direction="column" alignItems="flex-start" justifyContent="flex-start" wrap="nowrap">

          <Typography variant="button" color="secondary" align="right" gutterBottom>
          { props.deadline }
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom align="left">
          { props.title }
          </Typography>

          <Typography variant="body2" component="p" gutterBottom>
          { props.description }
          </Typography>

        </Grid>

      </CardContent>
      <CardActions>
        <Grid container direction="row" alignItems="center" justifyContent="space-between">
        <Button onClick={handleOpen} size="small" color="secondary">delete</Button>
        <ModalMUI 
          onClose={handleClose} 
          show={show}
          
          children={
            <ConfirmAction yesAction={handleYesAction} noAction={handleClose}/>
            }/>
        
        <FormControlLabel
        control={<Checkbox color="secondary" checked={props.complete} value={props.complete}  name="isdone" />}
        label="Done:" labelPlacement="start" onChange={handleCheck}
      />
      </Grid>
      </CardActions>
    </Card>
    </>
  )
}

function ConfirmAction (props) {
  return (
    <Paper>
      <Box p={2}> 
    <Grid container alignItems="center" justifyContent="center">

        <Grid container direction="column" alignItems="center">
        <ErrorOutlineIcon fontSize="large" color="error"/>
        <Typography variant="h4" gutterBottom>Are you sure?</Typography>
        </Grid>

      <Grid container direction="row">
        <ButtonGroup fullWidth>
          <Button onClick={props.yesAction} variant="contained" color="secondary">Yes</Button>
          <Button onClick={props.noAction} variant="contained" color="primary">No</Button>
          
        </ButtonGroup>
      </Grid>

    </Grid>
    </Box>
    </Paper>
  )
}