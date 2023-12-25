import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-performance.js"
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getStorage, ref as storageRef, uploadBytes } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

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
const perf = getPerformance(app);
const auth = getAuth(app);
const storage = getStorage(app);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lcn0e0oAAAAAF0WmoPVhQfTElJed3RaSEjTMdeY'),
  isTokenAutoRefreshEnabled: true
});

let user = "none";

window.onload = () => {
  onAuthStateChanged(auth, (user_v) => {
      if (user_v != null){
        user = user_v;
        afterAuth();
      }
  });
}

function afterAuth(){

  var firepfp;
  var premium;
  var profile_img;
  var uid;
  var username;


  //Getting Current User Setings For loggen in user
  const dbref = ref(database,"user_account/" + user.uid);
  onValue(dbref, (snapshot) => {
    const data = snapshot.val();
  
    const entries = [];
    for (const key in data) {
        entries.push(data[key]);
    }

    firepfp = entries[0];
    premium = entries[1];
    profile_img = entries[2];
    uid = entries[3];
    username = entries[4];
                
                
    document.getElementById('username_fld').setAttribute('value', username);
    if (premium == true){
        document.getElementById('premium_status').style.color = "#00ff00";
        document.getElementById('premium_status').innerText = "Active";
    }else{
        document.getElementById('premium_status').style.color = "#ff0000";
        document.getElementById('premium_status').innerText = "Not Active";
    }
  });




  //Upload Profile Image
  document.getElementById('upload-btn').addEventListener("click", (event) => {
    
    // Get the selected file from the upload input field
    const file = document.getElementById('upload-file').files[0];

    if(file != undefined){
      if (premium == true){
        const storageRef_v = storageRef(storage, 'users/' + user.uid + '/profile.png');

        uploadBytes(storageRef_v, file).then((snapshot) => {
          console.log("File Successfully Uploaded");
          document.getElementById('status_span').style.color = "#00ff00";
          document.getElementById('status_span').innerText = "File Uploaded Successfully";
          document.getElementById('status_span').style.display = "block";
        });
      }else{
        document.getElementById('status_span').style.color = "#ff0000";
        document.getElementById('status_span').innerText = "You Need To Be Premium For This Feature";
        document.getElementById('status_span').style.display = "block";
      }
    }else{
      console.error("No File Selected");
      document.getElementById('status_span').style.color = "#ff0000";
      document.getElementById('status_span').innerText = "You Need To Select A file to upload first";
      document.getElementById('status_span').style.display = "block";
    }
  });
    


  //Close Settings
  document.getElementById('settings_btn').addEventListener("click", (event) => {
    window.location.pathname = window.location.pathname.replace("/settings", "");
  });
}