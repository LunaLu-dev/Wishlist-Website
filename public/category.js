import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, query } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-check.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-performance.js"
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';

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
const firestore = getFirestore(app)
const perf = getPerformance(app);
const auth = getAuth(app);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lcn0e0oAAAAAF0WmoPVhQfTElJed3RaSEjTMdeY'),
  isTokenAutoRefreshEnabled: true
});

function getBaseUrl(url) {
  let parser = document.createElement('a');
  parser.href = url;

  return parser.hostname;
}

let page_url = window.location.pathname;
let page_url_split = page_url.split("/");

// Get the matched strings.
let uid = page_url_split[2];
let category = page_url_split[3];
let editmode = false;

onAuthStateChanged(auth, (user) => {
  if (user) {
    if (user.uid == uid){ //Enable Edit Mode
      //editmode = true;
    }
  }
});

window.onload = async () => {
  const q = query(collection(firestore, "users", uid, category));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {

    let template = document.createElement("div");
    template.classList.add("template-div");

    let divTn = document.createElement("div");
    divTn.classList.add("tn-container");
    divTn.setAttribute("onClick", "window.location = '" + doc.data().link + "';");

    let img = document.createElement("img");
    img.setAttribute("src", doc.data().img);
    img.classList.add("folder-tn");

    if(editmode == true){
      let delete_btn = document.createElement("img");
      delete_btn.classList.add("delete_icon");
      delete_btn.setAttribute("src", "/img/icons/delete.png");
      delete_btn.setAttribute("id", doc.data().link);
      template.appendChild(delete_btn);
    }

    let name = document.createElement("h1");
    let name_text = document.createTextNode(doc.data().title);
    name.appendChild(name_text);

    let price = document.createElement("h3");
    let price_text = document.createTextNode(doc.data().price + " " + doc.data().currency);
    price.appendChild(price_text);

    let src_url = document.createElement("h5");
    let src_url_text = document.createTextNode(getBaseUrl(doc.data().link));
    src_url.appendChild(src_url_text);

    divTn.appendChild(img);
    template.appendChild(divTn);
    template.appendChild(name);
    template.appendChild(price);
    template.appendChild(src_url);

    let element = document.getElementById("root-folder-bundle-div");
    if (element != null){
      element.appendChild(template); 
    }else{
      console.error("ERRoR: Root folder does not exist");
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
      <h3>&price</h3>
  </div> 
</div>


https://wishlist.aiboteri.net/category/$uid/$category_name
*/

