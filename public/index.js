import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
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
const analytics = getAnalytics(app);
const database = getDatabase(app);
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

        document.getElementById('sign_in_btn').innerText = "My List";
        document.getElementById('sign_in_btn').onclick = "window.location.pathname = /user/" + uid;
        document.getElementById("sign_up_btn").style.display = "none";

    }else{
        document.getElementById('sign_out_btn').style.display = "none";
    }
});


const usernameSearch = async () => {

    const search_term = document.getElementById('username_fld').value;

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
                if(key == "username" && value.includes(search_term)){
                    attr.push(value);
                    //console.log(value , search_term, "Match Found");
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
                });
                //0. profile_img
                //1. uid
                //2. username



                var results_template = document.createElement("div");
                results_template.classList.add("search_res");

                var profile_img = document.createElement("img");
                profile_img.setAttribute("src", attr_spec[0]);
                profile_img.style.width = "90px";
                profile_img.style.height = "90px";

                var results_username = document.createElement("h4");
                var results_username_text = document.createTextNode(attr[i]);
                results_username.appendChild(results_username_text);

                //var results_uid = document.createElement("h5");
                //var results_uid_text = document.createTextNode(attr_spec[1]);
                //results_uid.appendChild(results_uid_text);

                var results_link = document.createElement("a");
                results_link.href = "/user/" + attr_spec[1];
                results_link.innerText = "My List" 


                results_template.appendChild(profile_img);
                results_template.appendChild(results_username);
                //results_template.appendChild(results_uid);
                results_template.appendChild(results_link);

                var element = document.getElementById('search_results');
                element.appendChild(results_template);

                i++;
            }

            /*
            <div class="search_res">
                <img src=$profile_img>
                <h4>$username</h4>
                <a href="/user/$uid">My List</a>
            </div>
            */
        }
    });
}




document.getElementById('sign_out_btn').addEventListener("click", logout);
document.getElementById('search_btn').addEventListener("click", usernameSearch)