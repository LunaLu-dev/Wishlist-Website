import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-performance.js"
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';


window.onload = () => {
  const firebaseConfig = {
    /*API KEYS*/
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase(app);
  const perf = getPerformance(app);
  const auth = getAuth(app);
  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Lcn0e0oAAAAAF0WmoPVhQfTElJed3RaSEjTMdeY'),
    isTokenAutoRefreshEnabled: true
  });


  let url = window.location.pathname;
  // Split the URL into an array.
  var urlParts = url.split("/");
  // Get the last element of the array.
  var uid = urlParts[urlParts.length - 1];
  
  const dbref = ref(database,"user_data/" + uid + '/root/');
  onValue(dbref, (snapshot) => {
    const data = snapshot.val();
  
    const entries = [];
    for (const key in data) {
      const entry = {
        namef: key,
        dataf: data[key]
      };
      entries.push(entry);
    }
  
    for(const key2 in entries){
  
      const attr = [];
        
      for (let [key, value] of Object.entries(entries[key2].dataf)) {
        attr.push(value);
      }
      //0. img
      //1. link
      //2. name
  
  
          
      var template = document.createElement("div");

      var divTn = document.createElement("div");
      divTn.classList.add("tn-container");
      divTn.setAttribute("onClick", "window.location.pathname = 'category/" + uid + "/"  + attr[1] + "';");

      var img = document.createElement("img");
      img.setAttribute("src", attr[0]);
      img.classList.add("folder-tn");

      var name = document.createElement("h1");
      var name_text = document.createTextNode(attr[2]);
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
  });

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
};

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
