import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, child, push, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.css']
})
export class CreateNewComponent {

  checkoutForm = this.formBuilder.group({
    img: '',
    name: ''
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    
  }

  create_new_root() {
    console.log("ADDING NEW ROOT FOLDER TO DATABASE :)");
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
    const newPostKey = push(child(ref(database), '/user_1/root')).key;

    
    set(ref(database, 'user_1/root/' + newPostKey), {
      img: document.getElementById("root-img-new"),
      title: document.getElementById("root-name-new"),
    });

    location.pathname = "";
  }
}
