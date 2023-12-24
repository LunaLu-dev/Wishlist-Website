import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-performance.js"
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getStorage, ref as storageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

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
    const perf = getPerformance(app);
    const auth = getAuth(app);
    const storage = getStorage(app);
    const appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider('6Lcn0e0oAAAAAF0WmoPVhQfTElJed3RaSEjTMdeY'),
      isTokenAutoRefreshEnabled: true
    });

    onAuthStateChanged(auth, (user) => {
        if (user != null){
            const dbref = ref(database,"user_account/" + user.uid);
            onValue(dbref, (snapshot) => {
                const data = snapshot.val();
  
                const entries = [];
                for (const key in data) {
                    entries.push(data[key]);
                }

                const firepfp = entries[0];
                const premium = entries[1];
                const profile_img = entries[2];
                const uid = entries[3];
                const username = entries[4];
                
                
                document.getElementById('username_fld').setAttribute('value', username);
                if (premium == true){
                    document.getElementById('premium_status').style.color = "#00ff00";
                    document.getElementById('premium_status').innerText = "Active";
                }else {
                    document.getElementById('premium_status').style.color = "#ff0000";
                    document.getElementById('premium_status').innerText = "Not Active";
                }


                document.getElementById('upload-btn').addEventListener("click", (event) => {
                    console.log("Click");
                    var file = document.getElementById('upload-file').files[0];
                    var storageRefAddressPoint = storage.ref();

                    var uploadTask = storageRefAddressPoint.child("users/" + user.uid + "/profile.png").put(file);

                });

            });
        }
    });

    

    document.getElementById('settings_btn').addEventListener("click", (event) => {
        window.location.pathname = window.location.pathname.replace("/settings", "");
    });

}