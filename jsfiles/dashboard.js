import{app,auth,signOut,db,setDoc,doc,addDoc,serverTimestamp,getDoc,collection,where,onSnapshot,query,onAuthStateChanged
,getDocs,deleteDoc}from "../jsfiles/firbase.js"

 let logoutBtn=document.getElementById('logOUtBtn');
logoutBtn && logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    
   localStorage.clear()
 //location.href='/index.html'
    console.log('no')
   
  }).catch((error) => {
    console.log(error)
})

}
)

let deleteData=async(id)=>{
  try{
  //console.log(id)
  await deleteDoc(doc(db, "blogs", id));
  }
  catch(err){
    console.log(err)
  }
  }
let getMessages=async(uid)=>{
     let messages=document.getElementById('messageMain');
    let homeMessages=document.getElementById('messageMain');
    messages.innerHTML=" "

  const q = query(collection(db, "blogs"), where("userId", "==", uid));
  
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
   const {title,description,timestamp}=doc.data();

    messages.innerHTML+=` <div class="messagesList" >  
    <div class="submessagesList">
    <div class="userDetail">
      <div class="" style="height: 70px;border: 1px solid black;
       width: 70px;">
        <img height="65px" width="65px" src=${doc.data().userData.picture?doc.data().userData.picture:"../images/41-410093_circled-user-icon-user-profile-icon-png.png"} alt="">
      </div>
      <div style=" margin-left: 30px;">
        
        <h5>${doc.data().userData.displayName}</h5>
        <span style="margin-left: 20px;">${timestamp.toDate().toDateString()}</span>
      </div>
    </div>
    <div class="mind" id="textArea">
    <h5>${title}
        </h5>
      <p>${description}
      </p>
      <button type="button" class="btn btn-danger" id="addBtn"
        onclick="deleteData('${doc.id}')">Delete</button>
        <button type="button" class="btn btn-primary" id="addBtn"
        onclick="">Edit</button>
    </div>
  </div>
  </div>`
       
  });
 
   }
  
   let getUserData=async(uid)=>{
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
       console.log("Document data:", docSnap.data());
    }
     else {
  console.log("No such document!");
  }
  };
  
onAuthStateChanged(auth, (user) => {
 const uid=localStorage.getItem("uid")
// console.log(uid)
  if (user) {
 // console.log("user-----",user)
   getMessages(user.uid)
  // getUserData(uid)

  }else {
  
}
})

//////////////////////////////////AddMessage///////////////
let setMessage =
async() => {
  let titleValue=document.getElementById("title");
  let discription=document.getElementById("disInp");
  var uid=localStorage.getItem("uid");
  const docData = doc(db, "users", uid);
  const docSnap = await getDoc(docData);
 // console.log(docSnap.data())
       // try {
          const docRef = await addDoc(collection(db, "blogs"), {
            title:titleValue.value,
            description:discription.value,
            timestamp: serverTimestamp(),
            userId:uid,
            userData:docSnap.data()
          });
          titleValue.value="";
          discription.value="";
         getMessages(uid);
          //console.log("Document written with ID: ", docRef.id);
              
      //  } catch (err) {
          //  console.log(err)
       // }
    }
 window.deleteData=deleteData;
window.setMessage=setMessage;
