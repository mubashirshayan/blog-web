import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth,onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
    import {doc,getFirestore,getDoc,} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
 import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";
const firebaseConfig = {
  apiKey: "AIzaSyBLFUrJfhz1FxWoE-ufigx3U1fOXdIoUos",
  authDomain: "hackathon-1debc.firebaseapp.com",
  projectId: "hackathon-1debc",
  storageBucket: "hackathon-1debc.appspot.com",
  messagingSenderId: "1008041602781",
  appId: "1:1008041602781:web:dc3108ba8cf0baa2187534"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
 const db=getFirestore(app);
 const storage = getStorage();
 const userProfile = document.getElementById("user-profile");
let getUserData=async(uid)=>{
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
       let userName = document.getElementById("userName")
       let email = document.getElementById("email")
      console.log("Document data:", docSnap.data());
       userName.value = docSnap.data().displayName;
       email.value = docSnap.data().email;
       if (docSnap.data().picture) {
        userProfile.src = docSnap.data().picture
    }else{

    }
    
      // userProfile.src = docSnap.data().picture
  }
   else {
// docSnap.data() will be undefined in this case
console.log("No such document!");
}
};
  
  
  
  
  
  


onAuthStateChanged(auth, (user) => {
  const uid = localStorage.getItem("uid")
  if (user && uid) {
    //  console.log(user);
    //  console.log(user.uid);
       getUserData(user.uid)
  //       if (location.pathname !== "") {
  //         location.href = "home/home.html"
  //       }
  // } else {
  //      if (location.pathname !== '/index.html' && location.pathname !== "/login.html") {
  //         location.href = "../index.html"
  //      }
  }
});


let logoutBtn=document.getElementById('logoutBtn');
logoutBtn && logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    console.log('sign out')
    localStorage.clear()
        
 location.href='/index.html'
    
   
  }).catch((error) => {
    console.log(error)
})

}
)
const uploadFile=(file)=>{
  return new Promise((resolve,reject)=>{
    const storageRef = ref(storage, `images/${file.name}`);
    //console.log(file.files[0].name)
    const uploadTask = uploadBytesResumable(storageRef, file);
  
  uploadTask.on('state_changed', 
    (snapshot) => {
  
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      reject(error);
    }, 
    () => {
     
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        resolve(downloadURL);
      });
    }
  );
  }
  )
};
//////////////////////////////////////////////////////////////
const fileInput = document.getElementById("file-input");

fileInput.addEventListener("change", () => {
  
    userProfile.src = URL.createObjectURL(fileInput.files[0])
})
const updateProfile = document.getElementById("update-profile");

updateProfile && updateProfile.addEventListener("click", async () => {
    let uid = localStorage.getItem("uid")
    let userName = document.getElementById("userName")
    let email = document.getElementById("email")
    const imageUrl = await uploadFile(fileInput.files[0])
    const washingtonRef = doc(db, "users", uid);
    await updateDoc(washingtonRef, {
      displayName: userName.value,
        email: email.value,
        picture: imageUrl
    });
})