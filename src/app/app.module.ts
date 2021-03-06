import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FirebaseService } from './_services/firebase.service';
import { EstateListComponent } from './estate/estate-list/estate-list.component';
import { EstateDetailsComponent } from './estate/estate-details/estate-details.component';
import { EstateCardComponent } from './estate/estate-card/estate-card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EstateCreateComponent } from './estate/estate-create/estate-create.component';
import { RegisterComponent } from './register/register.component';
import { environment } from 'src/environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClientModule } from '@angular/common/http';
import '@angular/common/locales/global/pl';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EstateListComponent,
    EstateDetailsComponent,
    EstateCardComponent,
    NavBarComponent,
    EstateCreateComponent,
    RegisterComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxDropzoneModule,
    HttpClientModule
    
  ],
  providers: [FirebaseService,
    {
      provide: LOCALE_ID,
      useValue: 'pl-PL'
     },
     {
       provide: DEFAULT_CURRENCY_CODE,
       useValue: 'PLN'
     }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
