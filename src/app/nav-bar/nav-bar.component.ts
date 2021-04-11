import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isSignin = false;
  @Output() isLogout = new EventEmitter<void>();

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    this.isLogout.emit();
    this.isSignin = false;
  }
}
