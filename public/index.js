import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js';
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app-check.js";

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
const auth = getAuth(app);
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Lcn0e0oAAAAAF0WmoPVhQfTElJed3RaSEjTMdeY'),
    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true
});

const logout = async () => {

    try {
        const userCredential = await signOut(auth);
        console.log("SUCCESSFULLY LOGGED OUT");
    }catch (error){
        console.error("An Error Occured", error);
    }
}

/*onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("Logged In", uid);
      window.location.pathname = window.sessionStorage.getItem('last_path');
    } else {
      console.log("Logged Out");
    }
});*/

document.getElementById('sign_out_btn').addEventListener("click", logout);