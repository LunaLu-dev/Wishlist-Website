import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyD-21i_c71ZztSOOAVHg2Y2REK3031UzGM",
        authDomain: "wishlist-website-b0f92.firebaseapp.com",
        databaseURL: "https://wishlist-website-b0f92-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "wishlist-website-b0f92",
        storageBucket: "wishlist-website-b0f92.appspot.com",
        messagingSenderId: "1075962776143",
        appId: "1:1075962776143:web:a9f688ac1125c7edfcf83a",
        measurementId: "G-04H8TLJ8EK"
});
const auth = getAuth(firebaseApp);

const loginEmailPassword = async () => {

    const loginEmail = document.getElementById('login-email').value;
    const loginPassword = document.getElementById('login-password').value;
    //console.log(auth.uid);

    /*console.log(loginEmail);
    console.log(loginPassword);*/

    try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(userCredential.user);
        //console.log(auth.uid);
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
      localStorage.setItem("uid", uid);
    } else {
      // User is signed out
      console.log("logged Out");
    }
});

document.getElementById('login_btn').addEventListener("click", loginEmailPassword);