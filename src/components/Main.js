import React, { useState, useEffect } from 'react';
import { useAuth } from './services/userContext';
import { db } from './services/firebase_config';

// IMPORT COMPONENTS
import Navbars from './Nav';
import LoginButtons from './LoginButtons';
import SideButtons from './SideButtons';
import ShowCards from './ShowCards';
import Loading from './sub-components/Loading';



export default function Main() {

  const { currentUser } = useAuth();
  const [ myCards, setMyCards ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ myQuery, setMyQuery ] = useState(["complete", "==", false])

  const showComplete = () => {
    const doneQuery = ["complete", "==", true]
    setMyQuery(doneQuery);
    fetchCards();
  }
  const showTodo= () => {
    const todoQuery = ["complete", "==", false]
    setMyQuery(todoQuery);
    fetchCards();
  }
  const refreshDb= () => {
    fetchCards();
    console.log("Ping!")
  }
  
  function fetchCards() {
    
    setLoading(true);
    const getCards = [];
    
    const cardsRef = db
    .collection('users').doc(currentUser.email).collection('cards'); 
    cardsRef.where(...myQuery)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // add document id to the data object
        
        let data = doc.data();
        data.id = doc.id;
        // format the data if date object exists
        data.deadline = data.deadline && data.deadline.toDate().toDateString();
        getCards.push(data);
      });
      
      setMyCards(getCards);
      setLoading(false);
    })
 }

  useEffect(() => {
    fetchCards();
    
  }, []);
 
  return (
    <div>
      <Navbars 
      topChildren={<LoginButtons />} 
      sideChildren={<SideButtons showComplete={showComplete} showTodo={showTodo} refreshDb={refreshDb}/>}

      // mainChildren={<CardList myCards={cardsData}/>}  
      mainChildren={loading ? <Loading /> : <ShowCards myCards={myCards}/>}  
      />

    </div>
  )
}
