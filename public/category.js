import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
//import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getFirestore, collection, getDocs, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-check.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-performance.js"
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';

function getBaseUrl(url) {
  var parser = document.createElement('a');
  parser.href = url;

  return parser.hostname;
}


// Match the regular expression against the URL.
let page_url = window.location.pathname;
var page_url_split = page_url.split("/");

// Get the matched strings.
var uid = page_url_split[2];
var category = page_url_split[3];

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
//const database = getDatabase(app);
const firestore = getFirestore(app)
const perf = getPerformance(app);
const auth = getAuth(app);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lcn0e0oAAAAAF0WmoPVhQfTElJed3RaSEjTMdeY'),
  isTokenAutoRefreshEnabled: true
});

window.onload = () => {

  var editmode = false;

  onAuthStateChanged(auth, (user) => {
    if (user) { //Logged In
        const user_uid = user.uid;
        if (user_uid == uid){ //Enable Edit Mode
          editmode = true;
        }else{
          editmode = false;
        }
    }else{ //Logged Out
        editmode = false;
    }
  });


  //const dbref = ref()

 

  
  /*const dbref = ref(database, "/user_data/" + uid + "/category/" + category);
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

      const img_v = attr[0];
      const link_v = attr[1];
      const price_v = attr[2];
      const name_v = attr[3];
      
  
          
      var template = document.createElement("div");
      template.classList.add("template-div");

      var divTn = document.createElement("div");
      divTn.classList.add("tn-container");
      divTn.setAttribute("onClick", "window.location = '" + link_v + "';");

      var img = document.createElement("img");
      img.setAttribute("src", img_v);
      img.classList.add("folder-tn");
      //if(editmode == true){
      //  var delete_btn = document.createElement("img");
      //  delete_btn.classList.add("delete_icon");
      //  delete_btn.setAttribute("src", "/img/icons/delete.png");
      //  delete_btn.setAttribute("id", link_v);
      //  template.appendChild(delete_btn);
      //}
      

      var name = document.createElement("h1");
      var name_text = document.createTextNode(name_v);
      name.appendChild(name_text);

      var price = document.createElement("h3");
      var price_text = document.createTextNode(price_v);
      price.appendChild(price_text);

      var src_url = document.createElement("h5");
      var src_url_text = document.createTextNode(getBaseUrl(link_v));
      src_url.appendChild(src_url_text);
  
      divTn.appendChild(img);
      template.appendChild(divTn);
      template.appendChild(name);
      template.appendChild(price);
      template.appendChild(src_url);

      var element = document.getElementById("root-folder-bundle-div");
      if (element != null){
        element.appendChild(template); 
      }else{
        console.error("ERRoR: element is equal to null");
      }
      
    }
  });*/

  
};

/*
<div id=root-folder-bundle-div>
  <div>
      <div class="tn-container">
        <img src=$imgsrc class="folder-tn">
      </div>
      <h1>$name</h1>
      <h3>&price</h3>
  </div> 
</div>


https://wishlist.aiboteri.net/category/$uid/$category_name
*/

