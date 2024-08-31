import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-check.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-performance.js";

const firebaseConfig = {
  /*API KEYS*/
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
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

      await setDoc(doc(firestore, "users", userCredential.user.uid), {
        firepfp: false,
        premium: false,
        profile_img: signUpPfp,
        uid: userCredential.user.uid,
        username: signUpUsername
      })

    setTimeout(() => { window.location.pathname = ""; }, 100);
      
  }catch (error){
    document.getElementById('signUp-email').style.borderColor = "#ff0000";
    document.getElementById('signUp-password').style.borderColor = "#ff0000";
  }
}

document.getElementById('create_account_btn').addEventListener("click", signUpEmailPassword);
