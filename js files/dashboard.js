import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth,signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {getFirestore,getDoc,collection, addDoc, doc,onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
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

 let logoutBtn=document.getElementById('logOUtBtn');
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
//////////////////////////////////AddMessage///////////////
let setMessage =

async() => {
  let userValue=document.getElementById("input");

   
        try {

            const docRef = await addDoc(collection(db, "messages"), {
                message: userValue.value,
                
                
            });
            
           
        } catch (err) {
            console.log(err)
        }
    }


/////////////getMessages////////////////////
let getMessages=()=>{
  let messages=document.getElementById('messageMain');
  let homeMessages=document.getElementById('messageMain');
   onSnapshot(collection(db, "messages"), (data) => {
    data.docChanges().forEach((message) => {
      console.log(message.doc.data())
      messages.innerHTML+=`  <div id='${message.doc.id}'></div>
      <div class="messagesList">
        <div class="submessagesList">
           
          <div class="mind"  id="textArea"><p>'${message.doc.data().message}'</p></div>
          <div class="AddBtn"><button type="button" class="btn btn-primary" id="addBtn" onclick="deleteData('${message.doc.id}')">Delete</button></div>
        </div>
      </div> `
    
  // homeMessages.innerHTML+=`<div id="messageMain"></div>
  // <div class="messagesList">
  //   <div class="submessagesList">
       
  //     <div class="mind"  id="textArea"><p>'${message.doc.data().message}'</p></div>
  //     <div class="AddBtn"><button type="button" class="btn btn-primary" id="addBtn">Delete</button></div>
  //   </div>
  // </div>`
    })
    
  });
}
///////////////////////delete messages/////////////
let deleteData=async(id)=>{
  console.log(id)
  await deleteDoc(doc(db, "messages", id));
  }
getMessages();

let getIndexMessage=()=>{

  let homeMessages=document.getElementById('messageRun');
   onSnapshot(collection(db, "messages"), (data) => {
    data.docChanges().forEach((message) => {
      console.log(message.doc.data())
      
    
  homeMessages.innerHTML+=`<div class="messageMain" id='${message.doc.id}' ></div>
  <div class="messagesList">
    <div class="submessagesList">
       
      <div class="mind"  id="textArea"><p>'${message.doc.data().message}'</p></div>
      <div class="AddBtn"><button type="button" class="btn btn-primary" id="addBtn" onclick="deleteData('${message.doc.id}')">Delete</button></div>
    </div>
  </div>`
    })
    
  });
}
getIndexMessage();


function valueChange(val){
  let text=document.getElementById('textArea');
 text.innerHTML=val;

}
let userAlert=()=>{
alert('Please Create Your Account To Create a Own Blog')
}
window.deleteData=deleteData;
window.userAlert=userAlert;
window.valueChange=valueChange;
window.setMessage=setMessage;
// window.userInput=userInput;