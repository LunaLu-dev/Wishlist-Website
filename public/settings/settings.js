import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-check.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-performance.js"
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
import { getStorage, ref as storageRef, uploadBytes } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

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
const firestore = getFirestore(app);
const perf = getPerformance(app);
const auth = getAuth(app);
const storage = getStorage(app);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lcn0e0oAAAAAF0WmoPVhQfTElJed3RaSEjTMdeY'),
  isTokenAutoRefreshEnabled: true
});


onAuthStateChanged(auth, async (user) => {
  if (!user){
    window.sessionStorage.setItem("redirect_url", window.location.pathname);
    window.location.pathname = "/login";
    return;
  }

  //Getting Current Settings
  const currentSettings = await getDoc(doc(firestore, "users", user.uid));

  document.getElementById('username_fld').setAttribute('value', currentSettings.data().username);

  if (currentSettings.data().premium == true){
    document.getElementById('premium_status').style.color = "#00ff00";
    document.getElementById('premium_status').innerText = "Active";
  }else{
    document.getElementById('premium_status').style.color = "#ff0000";
    document.getElementById('premium_status').innerText = "Not Active";
  }

  //Upload Coustome Profile Image
  document.getElementById('upload-btn').addEventListener("click", (event) => {
    // Get the selected file from the upload input field
    const file = document.getElementById('upload-file').files[0];

    if(file == undefined || premium == false){
      alert("An error occured, Please Try agin later");
      return;
    }
    const storageRef_v = storageRef(storage, 'users/' + user.uid + '/profile.png');

    uploadBytes(storageRef_v, file).then((snapshot) => {
      console.log("File Successfully Uploaded");
      document.getElementById('status_span').style.color = "#00ff00";
      document.getElementById('status_span').innerText = "File Uploaded Successfully";
      document.getElementById('status_span').style.display = "block";
    });
  });
  
});

//Close Settings
document.getElementById('settings_btn').addEventListener("click", (event) => {
  window.location.pathname = window.location.pathname.replace("/settings", "");
});
