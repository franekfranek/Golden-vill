import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IEstate } from '../Models/IEstate';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class EstateService {
  estateCollection: AngularFirestoreCollection<IEstate>;

  constructor(private firestore: AngularFirestore) {
    this.estateCollection = this.firestore.collection('estate');
   }

   getEstates() {
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
                .where("price", ">=", form.value.priceFrom)
                .where("price", "<=", form.value.priceTo);
    
    });
  }
}
