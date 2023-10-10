import{app,auth,signOut,db,setDoc,doc,addDoc,serverTimestamp,getDoc,collection,where,onSnapshot,query,onAuthStateChanged
    ,getDocs}from "../jsfiles/firbase.js"


    onAuthStateChanged(auth, (user) => {
        const uid=localStorage.getItem("uid")
       // console.log(uid)
         if (user) {
         console.log("user-----",user)
         getAlluserBlogs();
          
        
       
         }else {
         getAlluserBlogs();
       }
       })





let getAlluserBlogs=async()=>{
  try{
   let messages=document.getElementById('messageMain');
    

const querySnapshot = await getDocs(collection(db, "blogs"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots


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
        <a href="userallblog.html?user=${doc.data().userId}">User all Blogs</a>
      </div>
   
    </div>
    </div>`

})}
catch(error){
console.log(error)
}
}
