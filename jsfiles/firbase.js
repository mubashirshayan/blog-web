import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"
import { getFirestore,doc, setDoc,collection,getDoc,getDocs,addDoc,updateDoc,deleteDoc,serverTimestamp,query, where, onSnapshot  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";


const firebaseConfig = {
  authDomain: "smit-hacathon.firebaseapp.com",
  projectId: "smit-hacathon",
  storageBucket: "smit-hacathon.appspot.com",
  apiKey:"AIzaSyDFet_oLnHFBqffut41D1RwYc63JSPgP_k",
   messagingSenderId: "867373705069",
   appId:"1:867373705069:web:d367b468e1042c22525c64",
   measurementId: "G-NY0XX4M5C2",
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db=getFirestore(app);
  const storage = getStorage();
  export{app,auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,db,setDoc,doc,signOut
 ,ref,uploadBytesResumable,getDownloadURL,getDoc,storage,addDoc,updateDoc,deleteDoc,serverTimestamp,collection,query,where,onSnapshot,getDocs
}
  
const env = {
  apiKey:"AIzaSyDFet_oLnHFBqffut41D1RwYc63JSPgP_k",
   messagingSenderId: "867373705069",
   appId:"1:867373705069:web:d367b468e1042c22525c64",
   measurementId: "G-NY0XX4M5C2",
}
