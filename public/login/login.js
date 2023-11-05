import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app-check.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-performance.js"

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const perf = getPerformance(app);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lcn0e0oAAAAAF0WmoPVhQfTElJed3RaSEjTMdeY'),
  isTokenAutoRefreshEnabled: true
});

const loginEmailPassword = async () => {

    const loginEmail = document.getElementById('login-email').value;
    const loginPassword = document.getElementById('login-password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(userCredential.user);
    }catch (error){
        console.error("An Error Occured", error);
        document.getElementById('login-email').style.borderColor = "#ff0000";
        document.getElementById('login-password').style.borderColor = "#ff0000";
        document.getElementById('statusText').style.display = "block";
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("Logged In", uid);
      if(window.sessionStorage.getItem("last_path") != null){
        window.location.pathname = window.sessionStorage.getItem('last_path');
      }
    } else {
      console.log("Logged Out");
    }
});

document.getElementById('login_btn').addEventListener("click", loginEmailPassword);