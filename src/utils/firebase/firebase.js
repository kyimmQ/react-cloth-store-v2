import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrcuw0fnMmFtvVZIXfcwPoVv7h3e_dzPw",
  authDomain: "react-cloth-store-bc4fd.firebaseapp.com",
  projectId: "react-cloth-store-bc4fd",
  storageBucket: "react-cloth-store-bc4fd.appspot.com",
  messagingSenderId: "527290038112",
  appId: "1:527290038112:web:5cafeb4b8a65b7d6c49005",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();

// initialize a provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account", // Forces account selection even when one account is available (optional)
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserFromAuth = async (userAuth, additionalInfo = {}) => {
  const newUserRef = doc(db, "users", userAuth.uid);
  const data = await getDoc(newUserRef);

  if (!data.exists()) {
    const { displayName, email } = userAuth;
    const date = new Date();
    try {
      await setDoc(newUserRef, {
        displayName,
        email,
        date,
        ...additionalInfo,
      });
    } catch (error) {
      console.log(`Error creating user document: ${error}`);
    }
  }

  return newUserRef;
};

export const createUserFromEmail = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInUserWithEmail = async (email, password) => {
  if (!email || !password) return null;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
export const signOutUser = async () => await signOut(auth);
