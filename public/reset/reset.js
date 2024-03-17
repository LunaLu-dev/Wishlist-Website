import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-check.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-performance.js"

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

const resetPassword = async () => {

  const loginEmail = document.getElementById('login-email').value;

  try {
    const userCredential = await sendPasswordResetEmail(auth, loginEmail);
    document.getElementById('error_display').innerText = "Email sent if you don't see it check the \"junk mail\" folder";
    document.getElementById('error_display').style.color = "#00ff00";
    document.getElementById('error_display').style.display = "block";
  }catch (error){
    document.getElementById('error_display').value = "An Error Occured, Try Again Later"
    document.getElementById('error_display').style.color = "#ff0000";
    document.getElementById('error_display').style.display = "block";
  }
}


document.getElementById('login_btn').addEventListener("click", resetPassword);