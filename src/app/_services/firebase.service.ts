import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;
  constructor(private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  async signIn(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(res => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user));
    });
  }

  async signUp(email: string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user));
    });
  }
  
  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }

  getEstates(){
    return this.firestore.collection('estate'). snapshotChanges();
  }

  addEstate(estate: IEstate){
    return this.firestore.collection('estate').doc().set(estate);
  }

  updateEstate(estateId: string | undefined , estate: IEstate){
    return this.firestore.doc('estate/' + estateId).update(estate);
  }
  
  deleteEstate(estateId: string | undefined){
    return this.firestore.doc('estate/' + estateId).delete();

  }

}

export interface IEstate{
  id?: string;
  city: string;
  street: string;
  // urls: {[n: number]: string};
  links: string[];
}
