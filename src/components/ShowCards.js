import React from 'react'
import { Box, Grid } from '@material-ui/core'
import MemCard from './card'
// import { useAuth } from './services/userContext';
// import { db } from './services/firebase_config';

export default function ShowCards( {myCards} ) {

  // const { currentUser } = useAuth();

  // const [loading, setLoading] = useState(false);
  // const [myCards, setMyCards] = useState([]);
  
  // useEffect(() => {
  //   const getCards = [];
  //   const dbClient = db
  //   .collection('users').doc(currentUser.email).collection('cards')
  //   .onSnapshot((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       // add document id to the data object
  //       let data = doc.data();
  //       data.id = doc.id;
  //       // format the data if date object exists
  //       data.deadline = data.deadline && data.deadline.toDate().toDateString();
  //       getCards.push(data);
  //     });
  //     setMyCards(getCards);
  //   // setLoading(false);
  //   });
  //   return () => dbClient();
  // }, []);

  return (
    <Box p={2}> 
      <Grid container 
        spacing={2}
        alignItems="flex-start"
        justifyContent="space-evenly"
        >
                
        { myCards && myCards.map(card =>
          <Grid item xs={12} sm={6} md={4} lg={4} spacing={3}>
            <MemCard id={card.id} title={card.title} description={card.description} deadline={ card.deadline } category={card.category} complete={card.complete}/>
          </Grid>  
          )
        }
      </Grid>
    </Box>
  )
}