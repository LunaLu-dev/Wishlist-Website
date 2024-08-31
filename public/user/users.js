import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-check.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-performance.js"
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';

const firebaseConfig = {
  /*API KEYS*/
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const perf = getPerformance(app);
const auth = getAuth(app);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lcn0e0oAAAAAF0WmoPVhQfTElJed3RaSEjTMdeY'),
  isTokenAutoRefreshEnabled: true
});

window.onload = async () => {
  
  let url = window.location.pathname;
  // Split the URL into an array.
  let urlParts = url.split("/");
  // Get the last element of the array.
  let uid = urlParts[urlParts.length - 1];

  const userDocSnap = await getDoc(doc(firestore, "users", uid))

  for(let i = 0; i <= userDocSnap.data().categories.length; i++){


    var template = document.createElement("div");

      var divTn = document.createElement("div");
      divTn.classList.add("tn-container");
      if(userDocSnap.data().categories[i].external == true){
        divTn.setAttribute("onClick", "window.location.href = '" + userDocSnap.data().categories[i].externalLink + "';");
      }else{
        divTn.setAttribute("onClick", "window.location.pathname = 'category/" + uid + "/"  + userDocSnap.data().categories[i].name + "';");
      }
      

      var img = document.createElement("img");
      img.setAttribute("src", userDocSnap.data().categories[i].img);
      img.classList.add("folder-tn");

      var name = document.createElement("h1");
      var name_text = document.createTextNode(userDocSnap.data().categories[i].name);
      name.appendChild(name_text);

  
      divTn.appendChild(img);
      template.appendChild(divTn);
      template.appendChild(name);

      var element = document.getElementById("root-folder-bundle-div");
      if (element != null){
        element.appendChild(template); 
      }else{
        console.error("ERRoR: element is equal to null");
      }

  }
}

onAuthStateChanged(auth, (user) => {
  let url = window.location.pathname;
  var urlParts = url.split("/");
  var uid = urlParts[urlParts.length - 1];
    
  if(user.uid == uid){
    document.getElementById('settings_btn').style.display = "block";
  }
});

document.getElementById('settings_btn').addEventListener("click", (event) => {
  window.location.pathname += "/settings";
});

/*
<div id=root-folder-bundle-div>
  <div>
      <div class="tn-container">
        <img src=$imgsrc class="folder-tn">
      </div>
      <h1>$name</h1>
  </div> 
</div>

https://wishlist.aiboteri.net/user/$uid
*/
