import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getFirestore, addDoc, doc, getDoc, updateDoc, collection } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-check.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-performance.js"

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
const firestore = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const perf = getPerformance(app);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lcn0e0oAAAAAF0WmoPVhQfTElJed3RaSEjTMdeY'),
  isTokenAutoRefreshEnabled: true
});

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.sessionStorage.setItem("redirect_url", window.location.pathname);
    window.location.pathname = "/login";
    return;
  }

  window.sessionStorage.clear();

  const user_doc = await getDoc(doc(firestore, "users", user.uid))

  const categories = user_doc.data().categories;

  categories.forEach( cat => {
    const category_template = document.createElement("option");
    category_template.value = cat;
    category_template.innerText = cat;

    document.getElementById("cat-root-fld").appendChild(category_template);
  });

  const category_template = document.createElement("option");
  category_template.value = "Create";
  category_template.innerText = "Add Category";

  document.getElementById("cat-root-fld").appendChild(category_template);

  document.getElementById('save-button').addEventListener('click', async () => {
    if(
      document.getElementById("img-root-fld").value == "" || 
      document.getElementById("name-root-fld").value == "" || 
      document.getElementById("price-root-fld").value == "" || 
      document.getElementById("link-root-fld").value == ""||
      document.getElementById("cat-root-fld").value == "category"
    ){
      document.getElementById('save-button').style.backgroundColor = "#ff0000";
      alert("Plese Fill In all Requred Fields");
      return;
    }

    let selectedCategory = document.getElementById("cat-root-fld").value;

    if(
      document.getElementById("cat-root-fld").value == "create" && document.getElementById("coustom-root-fld").value == ""){
      document.getElementById("coustom-root-fld").style.borderColor = "#ff0000";
      document.getElementById("save-button").style.backgroundColor = "#ff0000";
      alert("Please Ender The Category Title");
      return;
    }else if(document.getElementById("coustom-root-fld").value != ""){

      if(categories.indexOf(document.getElementById("coustom-root-fld").value) > -1 || document.getElementById("coustom-root-fld").value == "Create" || document.getElementById("coustom-root-fld").value == "category"){
        alert("Category already exists");
        return;
      }

      categories.push(document.getElementById("coustom-root-fld").value)
      await updateDoc(doc(firestore, "users", user.uid), {
        categories: categories
      });
      selectedCategory = document.getElementById("coustom-root-fld").value;
    }

    await addDoc(collection(firestore, "users", user.uid, selectedCategory), {
      img: document.getElementById("img-root-fld").value,
      link: document.getElementById("link-root-fld").value,
      price: document.getElementById("price-root-fld").value,
      currency: document.getElementById("currency-root-fld").value,
      title: document.getElementById("name-root-fld").value
    });

    //Resets Form
    document.getElementById("img-root-fld").value = "";
    document.getElementById("name-root-fld").value = "";
    document.getElementById("price-root-fld").value = "";
    document.getElementById("link-root-fld").value = "";
    document.getElementById("cat-root-fld").value = "category";
    document.getElementById("coustom-root-fld").value = "";
    document.getElementById("coustom-root-fld").style.display = "none";
    window.location.reload();

  });
});

document.getElementById("cat-root-fld").addEventListener("change", () => {
  if(document.getElementById("cat-root-fld").value != "Create"){
    document.getElementById("coustom-root-fld").style.display = "none";
    document.getElementById("coustom-root-fld").value = "";
    return;
  }
  document.getElementById("coustom-root-fld").style.display = "block";
});

document.getElementById("img-root-fld").addEventListener("change", () => {
  document.getElementById('preview-root-img').src = document.getElementById("img-root-fld").value;
});