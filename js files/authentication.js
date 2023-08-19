import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword, GoogleAuthProvider,onAuthStateChanged
    ,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
    import {
        doc, setDoc ,getFirestore,
       } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js"
const firebaseConfig = {
  apiKey: "AIzaSyBLFUrJfhz1FxWoE-ufigx3U1fOXdIoUos",
  authDomain: "hackathon-1debc.firebaseapp.com",
  projectId: "hackathon-1debc",
  storageBucket: "hackathon-1debc.appspot.com",
  messagingSenderId: "1008041602781",
  appId: "1:1008041602781:web:dc3108ba8cf0baa2187534"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db=getFirestore();
const provider = new GoogleAuthProvider(app);

let passwordError=document.getElementById('password-error');
let emailError=document.getElementById('email-error');
//////////////////////////////////// SIGNUP FORM////////////////////////////////////////

let signup=()=>{
                                                             
let displayName=document.getElementById('user-name');
let password=document.getElementById('password');
let email=document.getElementById('email');

  createUserWithEmailAndPassword(auth, email.value, password.value)
.then(async(userCredential) => {
  try {
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
        displayName: displayName.value,
        email: email.value,
        password: password.value
    });

    localStorage.setItem("uid", user.uid)
   location.href = "./../dashboard.html"
  
} catch (err) {
   
}
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  console.log(errorMessage);
  if (errorMessage === 'Firebase: Error (auth/missing-password).') {
    console.log('yes')
    passwordError.innerHTML='*'+"missing password"
  }
   if(errorMessage=="Firebase: Password should be at least 6 characters (auth/weak-password)."){
    console.log('no')
    passwordError.innerHTML='*'+"password should be atleast 6 character"
    
   }
   if (errorMessage =='Firebase: Error (auth/user-not-found).') {
    console.log('yes')
    let emailError=document.getElementById('email-error');
   emailError.innerHTML+='*'+"user not found"
  }
  if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
    console.log('yes')
   emailError.innerHTML='*'+"Please enter correct email"
  }
   if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
    console.log('yes')
    let Error=document.getElementById('email-error');
   Error.innerHTML='*'+"email-already-in-use"
  }
});

}
onAuthStateChanged(auth, (user) => {
    const uid = localStorage.getItem("uid")
   
  })

////////////////////////////////LoginButton/////////////////////////
const loginBtn = document.getElementById('login-btn');

loginBtn && loginBtn.addEventListener("click", (e) => {
    e.preventDefault()
  let password=document.getElementById('password');
let email=document.getElementById('email');
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async(userres) => {
      const user = userres.user;
      console.log(user)
      localStorage.setItem("uid", user.uid)
       location.href = "./../dashboard.html"
      }
    )
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      if (errorMessage=='Firebase: Error (auth/user-not-found).') {
 
        let passwordError=document.getElementById('password-error');
        passwordError.innerHTML='*'+"user not found"
        emailError.innerHTML='*'+"user not found"
      }
      if (errorMessage === 'Firebase: Error (auth/missing-password).') {
        
        let passwordError=document.getElementById('password-error');
        passwordError.innerHTML='*'+"missing password"
      }
      if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
       
        let passwordError=document.getElementById('password-error');
        passwordError.innerHTML='*'+"please enter correct password"
      }
      if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
   
       emailError.innerHTML='*'+"Please enter correct email"
      }
    });
}
)


window.signup=signup;