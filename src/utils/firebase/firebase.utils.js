import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
import {
    getFirestore,
    doc,  // retrieving the actual document instance
    getDoc,  // getting document data
    setDoc,  // setting document data
} from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdX_JycUwpbK10Vyp7GY-VS0HJ-qnB0lA",
  authDomain: "crwn-clothing-db-18c53.firebaseapp.com",
  projectId: "crwn-clothing-db-18c53",
  storageBucket: "crwn-clothing-db-18c53.appspot.com",
  messagingSenderId: "142714991745",
  appId: "1:142714991745:web:fb844220e4f02e6d5c4980"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// setting up config for Google
// set new google auth instance
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// creating databse
export const db = getFirestore();  // allows us to communicate to the database in the console

export const createUserDocumentFromAuth = async (userAuth) => {

    // creating/retrieving a document reference using the doc(database, collection, unique identifier) method
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    // getting the document's data "snapshot"
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    // leveraging the .exists() method to check if the document reference and its data exist
    // if docRef exists return object; else create document in database
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('Error creating user', error);
        }
    }

    return userDocRef;

} 
