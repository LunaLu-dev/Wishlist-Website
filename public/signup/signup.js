import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-performance.js";
import { getStorage, ref as storageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
    /*API KEYS*/
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const storage = getStorage(app);
const perf = getPerformance(app);
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Lcn0e0oAAAAAF0WmoPVhQfTElJed3RaSEjTMdeY'),
    isTokenAutoRefreshEnabled: true
});


const signUpEmailPassword = async () => {

    const signUpEmail = document.getElementById('signUp-email').value;
    const signUpPassword = document.getElementById('signUp-password').value;
    const signUpUsername = document.getElementById('signUp-username').value.replaceAll(" ", "_");
    var signUpPfp = document.getElementById('signUp-pfp').value;

    if (signUpPfp == ""){
      signUpPfp = "/img/icons/account.png";
    }

    

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);

        const dbref = ref(database, "/user_index/" + signUpUsername);
        
        sendEmailVerification(auth.currentUser)
          .then(() => {
          console.log("Verification Email Sent");
          });
    
        onValue(dbref, (snapshot) => {
          const data = snapshot.val();
          if (data == null){
            set(ref(database, "user_index/" + signUpUsername), {
                firepfp: false,
                premium: false,
                profile_img: signUpPfp,
                uid: userCredential.user.uid,
                username: signUpUsername
            });
          }else{
            document.getElementById('signUp-username').style.borderColor = "#ff0000";
            document.getElementById('create_account_btn').style.borderColor = "#ff0000";
            document.getElementById('error_display').innerText = "Username Taken :(";
            document.getElementById('error_display').style.display = "block";
          }
        });

        setTimeout(() => { window.location.pathname = ""; }, 100);
        
    }catch (error){
        console.error("An Error Occured ", error);
        document.getElementById('signUp-email').style.borderColor = "#ff0000";
        document.getElementById('signUp-password').style.borderColor = "#ff0000";
    }
}

document.getElementById('create_account_btn').addEventListener("click", signUpEmailPassword);
