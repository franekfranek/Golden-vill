import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isSignin = false;
  @Output() isLogout = new EventEmitter<void>();

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  logout(){
    this.firebaseService.logout();
    this.isLogout.emit();
    this.isSignin = false;
  }
}
