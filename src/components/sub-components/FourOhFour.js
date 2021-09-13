import { Box, Paper, Grid, Typography, Divider, Container, makeStyles } from '@material-ui/core'
import React from 'react'

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

export default function FourOhFour() {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="md">
    
      <Paper>
        <Box p={2}>
          <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.info}>
            <Typography variant="h2" gutterBottom className={classes.item}>404</Typography>
            <Divider orientation="vertical" flexItem className={classes.item}/>
            <Typography variant="body1" className={classes.item}>Page not found</Typography>

          </Grid>
        </Box>
      </Paper>

    
    </Container>
  )
}
