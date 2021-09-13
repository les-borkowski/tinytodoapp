import { Box, Paper, Grid, Typography, Container, makeStyles } from '@material-ui/core'
import React from 'react'

import HourglassEmpty from '@material-ui/icons/HourglassEmpty';

const useStyles = makeStyles((theme) => ({

  root: {
    marginTop: theme.spacing(2),
    
  },
  info: {
    height: '60vh',
  },
  item: {
    marginLeft: theme.spacing(1),
  }

}))

export default function Loading() {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="md">
    
      <Paper>
        <Box p={2}>
          <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.info}>
            <HourglassEmpty className={classes.item}/>
            <Typography variant="body1" className={classes.item}>Loading...</Typography>

          </Grid>
        </Box>
      </Paper>

    
    </Container>
  )
}
