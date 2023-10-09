
    import {doc,getDoc,onAuthStateChanged,signOut,app,auth,getDownloadURL,
    ref,uploadBytesResumable,db,storage,updateDoc} from "../jsfiles/firbase.js"


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
         userProfile.src="../images/41-410093_circled-user-icon-user-profile-icon-png.png"
     }

  }
   else {
console.log("No such document!");
}
};
//console.log(location)
onAuthStateChanged(auth, (user) => {
  const uid = localStorage.getItem("uid")
  if (user ) {
       getUserData(user.uid)
        if (location.pathname !== "/profile/profile.html") {
           location.href = "/profile/profile.html"
      }
      
  console.log(user)
}
   else {
      if (location.pathname !== '/index.html' && location.pathname !== "/login.html") {
           location.href = "../index.html"      }
           console.log("user not found")
  }

});


// let logoutBtn=document.getElementById('logoutBtn');
// logoutBtn && logoutBtn.addEventListener("click", () => {
//   signOut(auth).then(() => {
//     console.log('sign out')
//     localStorage.clear()
//   }).catch((error) => {
//     console.log(error)
// })

// }
// )
const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
      const mountainsRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(mountainsRef, file);
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
              reject(error)
          },
          () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  resolve(downloadURL);
              });
          }
      );
  })
}

//////////////////////////////////////////////////////////////
const fileInput = document.getElementById("file-input");

fileInput && fileInput.addEventListener("change", () => {
    console.log(fileInput.files[0])
    userProfile.src = URL.createObjectURL(fileInput.files[0])
})

const updateProfile = document.getElementById("update-profile");

updateProfile && updateProfile.addEventListener("click", async () => {
    let uid = localStorage.getItem("uid")
    let fullName = document.getElementById("userName")
    let email = document.getElementById("email")
    const imageUrl = await uploadFile(fileInput.files[0])
    const washingtonRef = doc(db, "users", uid);
    await updateDoc(washingtonRef, {
        displayName: fullName.value,
        email: email.value,
        picture: imageUrl
    });
    
})
// let email = document.getElementById("email")
// let fullName = document.getElementById("userName");
// console.log(fullName.value,email.value);