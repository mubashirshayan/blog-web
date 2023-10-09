import { onAuthStateChanged,app,auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,db,setDoc,doc } from "../jsfiles/firbase.js"

//const db=getFirestore();

let passwordError=document.getElementById('password-error');
let emailError=document.getElementById('email-error');
//////////////////////////////////// SIGNUP FORM////////////////////////////////////////

let signup=()=>{
                                                             
let displayName=document.getElementById('user-name');
let password=document.getElementById('password');
let email=document.getElementById('email');
//console.log(displayName.value,password.value,email.value)
   createUserWithEmailAndPassword(auth, email.value, password.value)
.then(async(userCredential) => {
  try {
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
        displayName: displayName.value,
        email: email.value,
        password: password.value
    });
 console.log(user);
    localStorage.setItem("uid", user.uid)
  //  location.href = "./../dashboard.html"
} catch (err) {
   console.log(err)
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
console.log(localStorage.getItem("uid"))
 let signupBtn=document.getElementById("signupBtn");
 signupBtn&&signupBtn.addEventListener("click",signup)
onAuthStateChanged(auth, (user) => {
    const uid = localStorage.getItem("uid")
     if (user) {
      if(location.pathname!==
        "/dashboard.html"){
             location.href="/dashboard.html"
        } 
     }else {
     if(location.pathname!=="/authentication/signup.html" && location.pathname!=="/authentication/login.html"){
      location.href="/authentication/login.html"
}
}
  })
console.log(location);
// ////////////////////////////////LoginButton/////////////////////////
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
       //location.href = "./../dashboard.html"
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

