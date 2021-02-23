import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FirebaseService } from './_services/firebase.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
        apiKey: "AIzaSyCYxX42S6rWkalk72PS8reIySCvpfLloHU",
        authDomain: "golden-vill-app.firebaseapp.com",
        projectId: "golden-vill-app",
        storageBucket: "golden-vill-app.appspot.com",
        messagingSenderId: "485048521865",
        appId: "1:485048521865:web:356c5ba26f12e5ea2de258",
        measurementId: "G-4JBL970MGJ"
      })
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
