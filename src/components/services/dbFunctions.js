import { db, firebase } from "./firebase_config";

// delete selected document
export function deleteDoc(currentUser, cardID) {
  db.collection('users').doc(currentUser).collection('cards').doc(cardID).delete()
  .then(() => {
        console.log("Document successfully deleted!");
        
    }).catch((error) => {
        console.error("Error removing document: ", error);
    })
  
};

// update check box
export function setCheckbox(currentUser, cardID, value) {
    db.collection('users').doc(currentUser).collection('cards').doc(cardID).update(
        {complete: value}
    ).then(() => {
        console.log(value);
        console.log("Document successfully changed!");
        
    }).catch((error) => {
        console.error("Error changing document: ", error);
    })
}

// add new card
export function writeCard(currentUser, title, descr, selectedDate) {

    db.collection('users').doc(currentUser).collection('cards').add({
        title: title,
        description: descr,
        deadline: selectedDate, 
        createdAt: firebase.firestore.Timestamp.now(),
        complete: false 
        }).then(() => {
            console.log("Card added!");
            
        }).catch((error) => {
            console.error("Database error: ", error);
        })
    }

// add new user collection
export function addUsersCol(currentUser) {
        db.collection('users').doc(currentUser).set({})
        .then(() => {
            console.log("User collection added!");
            
        }).catch((error) => {
            
            console.error("Database error: ", error);
        })
    }