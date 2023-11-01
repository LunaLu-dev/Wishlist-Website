import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import { getDatabase, ref, child, push, set } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';

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
const database = getDatabase(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);



onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("Logged In", uid);
    } else {
      // User is signed out
      console.log("logged Out");
      window.location.pathname = "login/index.html"
    }
});
