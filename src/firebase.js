import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCqIlDkhdVwTrdz4rMAQwEpICIH7bgURFg",
  authDomain: "neflix-clone-1815d.firebaseapp.com",
  projectId: "neflix-clone-1815d",
  storageBucket: "neflix-clone-1815d.appspot.com",
  messagingSenderId: "938759232409",
  appId: "1:938759232409:web:6e13a5f192c49e41b61108"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        });
  } catch (error) {
    console.log(error);
    toast.error(error.code);
  }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}

const logout = () => {
  signOut(auth);
}

export { signUp, login, logout, auth, db};