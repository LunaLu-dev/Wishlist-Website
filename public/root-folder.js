import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";


window.onload = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyD-21i_c71ZztSOOAVHg2Y2REK3031UzGM",
        authDomain: "wishlist-website-b0f92.firebaseapp.com",
        databaseURL: "https://wishlist-website-b0f92-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "wishlist-website-b0f92",
        storageBucket: "wishlist-website-b0f92.appspot.com",
        messagingSenderId: "1075962776143",
        appId: "1:1075962776143:web:a9f688ac1125c7edfcf83a",
        measurementId: "G-04H8TLJ8EK"
      };
  
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      const database = getDatabase(app);
      
  
      var userID = 1;
  
      const dbref = ref(database, 'user_' + userID + '/root/');
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
            console.log(`${key}: ${value}`);
            attr.push(value);
          }
          //0. img
          //1. link
          //2. name
  
  
          
          var template = document.createElement("div");

          var divTn = document.createElement("div");
          divTn.classList.add("tn-container");
          divTn.setAttribute("onClick", "window.location.pathname = window.location.pathname + 'category/" + attr[1] + "';");

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
*/