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
      

      if(localStorage.getItem("img") != ""){ 
        document.getElementById('preview-root-img').src = document.getElementById("img-root-fld").value;
      }
    
        document.getElementById('save-button').addEventListener('click', () => {
    
          if(document.getElementById("cat-root-fld").value == "category"){
            
            document.getElementById('save-button').style.backgroundColor = "#ff0000";
            document.getElementById('cat-root-fld').style.borderBlockColor = "#ff0000";
    
          }else{
    
            if(document.getElementById("cat-root-fld").value == 'add_new'){
              const newPostKey = push(child(ref(database), "/users/" + uid + "/category/" + document.getElementById("cat-root-fld").value)).key;
        
              set(ref(database, "users/" + uid + '/root/' + newPostKey), {
                img: document.getElementById('img-root-fld').value,
                title: document.getElementById('coustom-root-fld').value,
                link: document.getElementById('coustom-root-fld').value.toLowerCase().replaceAll(" ", "_")
              });
    
              //Gets the key for new push
              const newPostKey2 = push(child(ref(database), "/users/"+ uid +"/category/" + document.getElementById("cat-root-fld").value)).key;
    
              set(ref(database, "users/" + uid +'/category/' + document.getElementById("coustom-root-fld").value + '/' + newPostKey2), {
                img: document.getElementById('img-root-fld').value,
                title: document.getElementById('name-root-fld').value,
                price: document.getElementById('price-root-fld').value,
                link: document.getElementById('link-root-fld').value
              });
    
    
            }else{
              //Gets the key for new push
              const newPostKey = push(child(ref(database), "/users/"+ uid +"/category/" + document.getElementById("cat-root-fld").value)).key;
        
              set(ref(database, "users/" + uid +'/category/' + document.getElementById("cat-root-fld").value + '/' + newPostKey), {
                img: document.getElementById('img-root-fld').value,
                title: document.getElementById('name-root-fld').value,
                price: document.getElementById('price-root-fld').value,
                link: document.getElementById('link-root-fld').value
              });
            }
            console.log("DATABASE UPDATED");
            //clears auto saved values after submit
            localStorage.removeItem("img");
            localStorage.removeItem("name");
            localStorage.removeItem("price");
            localStorage.removeItem("link");
            
          }
        });
    }else{
      // User is signed out
      console.log("logged Out");
      window.location.pathname = "login/index.html";
    }
});


document.getElementById('img-root-fld').addEventListener('change', () => {
    document.getElementById('preview-root-img').src = document.getElementById("img-root-fld").value;
    localStorage.setItem("img", document.getElementById("img-root-fld").value);
});
document.getElementById('name-root-fld').addEventListener('change', () => {
    localStorage.setItem("name", document.getElementById("name-root-fld").value);
});
document.getElementById('price-root-fld').addEventListener('change', () => {
    localStorage.setItem("price", document.getElementById("price-root-fld").value);
});
document.getElementById('link-root-fld').addEventListener('change', () => {
    localStorage.setItem("link", document.getElementById("link-root-fld").value);
});
document.getElementById('cat-root-fld').addEventListener('change', () => {
    localStorage.setItem("category", document.getElementById("cat-root-fld").value);
    if(document.getElementById('cat-root-fld').value == "add_new"){
      document.getElementById('coustom-root-fld').style.display = "block";
    }else{
      document.getElementById('coustom-root-fld').style.display = "none";
    }
});