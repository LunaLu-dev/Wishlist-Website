import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

@Component({
  selector: 'app-root-folders',
  templateUrl: './root-folders.component.html',
  styleUrls: ['./root-folders.component.css']
})

export class RootFoldersComponent {

  ngOnInit() {
    // Import the functions you need from the SDKs you need

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

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
    this.test(app);



  }

  test(app :any) {
    console.log(app)
  }

}