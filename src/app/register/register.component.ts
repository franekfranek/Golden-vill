import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isSignedIn = false;

  constructor(public firebaseService : FirebaseService) { }

  ngOnInit(): void {
    if(localStorage.getItem('user') !== null)
      this.isSignedIn = true;
      else
      this.isSignedIn = false;
  }

  async onSignup(email: string, password: string){
    await this.firebaseService.signUp(email, password);
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true;
  }

  async onSignin(email: string, password: string){
    await this.firebaseService.signIn(email, password);
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true;
  }

  handlelogout(){
    this.isSignedIn = false;
    
  }

}
