import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc, // retrieving the actual document instance
  getDoc, // getting document data
  setDoc, // setting document data
  collection, // create new collection
  writeBatch, // write documents to collection
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdX_JycUwpbK10Vyp7GY-VS0HJ-qnB0lA",
  authDomain: "crwn-clothing-db-18c53.firebaseapp.com",
  projectId: "crwn-clothing-db-18c53",
  storageBucket: "crwn-clothing-db-18c53.appspot.com",
  messagingSenderId: "142714991745",
  appId: "1:142714991745:web:fb844220e4f02e6d5c4980",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// setting up config for Google
// set new google auth instance
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// create a auth varaiable to be used throughout the app
export const auth = getAuth();

// sign in with popup(auth_var, provider)
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// creating databse
export const db = getFirestore(); // allows us to communicate to the database in the console

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey); // creating a collection reference

  // a transaction represents a successfull unit of work on a database
  // a successfull transaction is when all possible writes are reflected
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object); // batch set to the docRef
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories"); // need first collection reference
  const q = query(collectionRef); // generate query off of collection reference | returns object

  const querySnapshot = await getDocs(q); // get snapshot of documents from the query
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  // creating/retrieving a document reference using the doc(database, collection, unique identifier) method
  const userDocRef = doc(db, "users", userAuth.uid);

  // getting the document's data / "snapshot"
  const userSnapshot = await getDoc(userDocRef);

  // leveraging the .exists() method to check if the document reference and its data exist
  // if docRef exists return object; else create document in database
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating user", error);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// listeners accept a mandetory callback to do something when an event occurs (like a callback in .addEventListener)
// for the onAuthStateChange listener function, the event is mostly authentication states
// returns an unsubscribe variable to stop the listener; (prevents memory leaks; discard function after use)
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
