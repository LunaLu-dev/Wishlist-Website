import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-performance.js"
import { getStorage, ref as storageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

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
const analytics = getAnalytics(app);
const database = getDatabase(app);
const perf = getPerformance(app);
const storage = getStorage(app);
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Lcn0e0oAAAAAF0WmoPVhQfTElJed3RaSEjTMdeY'),
    isTokenAutoRefreshEnabled: true
});

const logout = async () => {

    try {
        const userCredential = await signOut(auth);
        console.log("SUCCESSFULLY LOGGED OUT");
        window.location.reload();
    }catch (error){
        console.error("An Error Occured", error);
    }
}




onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        //BUTTONS - Desktop
        document.getElementById('sign_in_btn').innerText = "My List";
        document.getElementById('sign_in_btn').setAttribute('onclick','window.location.pathname = ' + "'/user/" + uid + "'");
        document.getElementById("sign_up_btn").style.display = "none";

        //DROPDOWN - Mobile
        document.getElementById('login_drop_btn').innerText = "My List";
        document.getElementById('login_drop_btn').setAttribute('onclick','window.location.pathname = ' + "'/user/" + uid + "'");
        document.getElementById("signup_drop_btn").style.display = "none";


    }else{
        document.getElementById('sign_out_btn').style.display = "none";
        document.getElementById('logout_drop_btn').style.display= "none";
    }
});


const usernameSearch = async () => {

    const search_term = document.getElementById('username_fld').value.toLowerCase();

    const dbref = ref(database, "/user_index/");
    onValue(dbref, (snapshot) => {
      const data = snapshot.val();

      const entries = [];
      for (const key in data) {
        const entry = {
          namef: key,
          dataf: data[key]
        };
        entries.push(entry);
      }

        for(const key2 in entries){

            const attr = [];
      
            for (let [key, value] of Object.entries(entries[key2].dataf)) {
                if(key == "username" && value.toString().toLowerCase().includes(search_term)){
                    attr.push(value);
                }
            }
            //0. username


            let i = 0;
            while (i < attr.length){

                const attr_spec = [];

                const dbref = ref(database, "/user_index/" + attr[i]);
                onValue(dbref, (snapshot) => {
                  const data = snapshot.val();
            
                  const entries = [];
                  for (const key in data) {
                    const entry = {
                      namef: key,
                      dataf: data[key]
                    };
                    entries.push(entry);
                  }

                  attr_spec.push(entries[0].dataf);
                  attr_spec.push(entries[1].dataf);
                  attr_spec.push(entries[2].dataf);
                  attr_spec.push(entries[3].dataf);
                  attr_spec.push(entries[4].dataf)

                });
                //0. firepfp
                //1. premium
                //2. profile_img
                //3. uid
                //4. username

                var v_firepfp = attr_spec[0];
                var v_premium = attr_spec[1];
                var v_profile_img = attr_spec[2];
                var v_uid = attr_spec[3];
                var v_username = attr_spec[4];





                var results_template = document.createElement("div");
                results_template.classList.add("search_res");
                results_template.setAttribute('onclick','window.location.pathname = ' + "'/user/" + v_uid + "'");

                var profile_img = document.createElement("img");
                if (v_premium == true && v_firepfp == true){

                    getDownloadURL(storageRef(storage, attr_spec[2] + "/profile.png"))
                    .then((url) => {
                      profile_img.setAttribute("src", url);
                    })
                    .catch((error) => {
                      console.error("Error Could Not Load Profile Picture From Firebase");
                    });

                }else{
                    profile_img.setAttribute("src", v_profile_img);
                }
                profile_img.style.width = "90px";
                profile_img.style.height = "90px";

                var results_username = document.createElement("h4");
                var results_username_text = document.createTextNode(attr[i]);
                results_username.appendChild(results_username_text);


                results_template.appendChild(profile_img);
                results_template.appendChild(results_username);

                var element = document.getElementById('search_results');
                element.appendChild(results_template);

                i++;
            }

            /*
            <div class="search_res" onclick=window.location.pathname = '/user/$uid'>
                <img src=$profile_img>
                <h4>$username</h4>
            </div>
            */
        }
    });
}

window.onload = () => {
    if(window.innerWidth <= 1130){
        document.getElementById('account_btns').style.display = "none";
        document.getElementById('hamburger-menu').style.display = "block";
    }else{
        document.getElementById('account_btns').style.display = "block";
        document.getElementById('hamburger-menu').style.display = "none";
    }
}



window.addEventListener("resize", (event) => {
    if(window.innerWidth <= 1130){
        document.getElementById('account_btns').style.display = "none";
        document.getElementById('hamburger-menu').style.display = "block";
    }else{
        document.getElementById('account_btns').style.display = "block";
        document.getElementById('hamburger-menu').style.display = "none";
    }
});

var menuOpen = false;
document.getElementById('menu-btn').addEventListener("click", (event) => {
    if(menuOpen){
        document.getElementById('menu-content').classList.add("show");
        document.getElementById('menu-content').classList.remove("hide");
        document.getElementById('menu_btn_arr').innerText = "expand_more";
        menuOpen = false
    }else{
        document.getElementById('menu-content').classList.add("hide");
        document.getElementById('menu-content').classList.remove("show");
        document.getElementById('menu_btn_arr').innerText = "expand_less";
        menuOpen = true
    }
});

document.getElementById('sign_out_btn').addEventListener("click", logout);
document.getElementById('logout_drop_btn').addEventListener("click", logout);
document.getElementById('search_btn').addEventListener("click", usernameSearch);

