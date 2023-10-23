import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the myForm property
    this.myForm = this.fb.group({
      email: '',
      message: '',
      career: ''
    })
  }

  ngOnInit() {
    this.myForm.valueChanges.subscribe(console.log);
  }
}
