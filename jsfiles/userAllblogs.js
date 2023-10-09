import{app,auth,signOut,db,setDoc,doc,addDoc,serverTimestamp,getDoc,collection,where,onSnapshot,query,onAuthStateChanged
    ,getDocs}from "../jsfiles/firbase.js"
    onAuthStateChanged(auth, (user) => {
        const uid=localStorage.getItem("uid")
        console.log(uid)
         if (user) {
         console.log("user-----",user)
          
         getMessages(user.uid)
       
         }else {
         
       }
       })
       let getMessages=async(uid)=>{
        let messages=document.getElementById('messageMain');
       messages.innerHTML=" "
   
     const q = query(collection(db, "blogs"), where("userId", "==", uid));
     
     const querySnapshot = await getDocs(q);
     querySnapshot.forEach((doc) => {
       console.log(doc.id, " => ", doc.data())
       const {title,description,timestamp}=doc.data();
       messages.innerHTML+=` <div class="messagesList" >  
       <div class="blogList">
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
         <p>${description} </p>
       </div>
     </div>
     </div>`
     })}