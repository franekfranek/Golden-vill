import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;
  estateCollection: AngularFirestoreCollection<IEstate>;


  constructor(private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.estateCollection = this.firestore.collection('estate');
   }

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

  getEstates() {
    // return this.firestore.collection('estate'). snapshotChanges().pipe(
    //   map(a => {
    //     const data = a.payload.val() as Course;
    //       const id = a.payload.key;
    //       return { id, ...data };
    //     }));
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
  
  getEstateById(estateId: any){
    return this.firestore.collection('estate').doc(estateId).valueChanges();
  }

  getByFilters(form: FormGroup){
    console.log(form.value);
    return this.estateCollection = this.firestore.collection<IEstate>("estate", ref => {
       return ref.where("city", "==", form.value.local)
                .where("class", "==", form.value.class)
                .where("type", "==", form.value.type)
                .where("priceFrom", ">=", form.value.priceFrom);
    
    });
  }

}

export interface  IEstate{
  id?: string;
  city: string;
  street: string;
  price: string;
  type: string;
  class: string;
  sfootage: string;
  rooms: string;
  floor: string;
  bildYear: string;
  garage: string;
  elevator: string;
  basement: string;
  links: string[];
}
