import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import { getDatabase, ref, child, push, set } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";


window.onload = () => {
  
  document.getElementById("img-root-fld").value = localStorage.getItem("img");
  document.getElementById("name-root-fld").value = localStorage.getItem("name");
  document.getElementById("price-root-fld").value = localStorage.getItem("price");
  document.getElementById("link-root-fld").value = localStorage.getItem("link");

  if(localStorage.getItem("img") != ""){
    document.getElementById('preview-root-img').src = document.getElementById("img-root-fld").value;
  }

    document.getElementById('save-button').addEventListener('click', () => {

      if(document.getElementById("cat-root-fld").value == "category"){
        
        document.getElementById('save-button').style.backgroundColor = "#ff0000";
        document.getElementById('cat-root-fld').style.borderBlockColor = "#ff0000";

      }else{
        //console.log("ADDING NEW ROOT FOLDER TO DATABASE :)");
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
    

        //Gets the key for new push
        const newPostKey = push(child(ref(database), '/user_1/category/' + document.getElementById("cat-root-fld").value)).key;
    
        set(ref(database, 'user_1/category/' + document.getElementById("cat-root-fld").value + '/' + newPostKey), {
          img: document.getElementById('img-root-fld').value,
          title: document.getElementById('name-root-fld').value,
          price: document.getElementById('price-root-fld').value,
          link: document.getElementById('link-root-fld').value
        });

        //clears auto saved values after submit
        localStorage.removeItem("img");
        localStorage.removeItem("name");
        localStorage.removeItem("price");
        localStorage.removeItem("link");
      }
        
    });
}

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