import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isSignedIn = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem('user') !== null)
      this.isSignedIn = true;
      else
      this.isSignedIn = false;
  }

  async onSignup(email: string, password: string){
    await this.authService.signUp(email, password);
    if(this.authService.isLoggedIn)
    this.isSignedIn = true;
  }

  async onSignin(email: string, password: string){
    await this.authService.signIn(email, password);
    if(this.authService.isLoggedIn)
    this.isSignedIn = true;
  }

  handlelogout(){
    this.isSignedIn = false;
  }

}
