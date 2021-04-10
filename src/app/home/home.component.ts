import { Component, OnInit } from '@angular/core';
import { FirebaseService, IEstate } from '../_services/firebase.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  estates: IEstate[];
 
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.loadEstates();
  }

  loadEstates(){
    this.firebaseService.getEstates().subscribe((res) =>{
      this.estates = res.map((estate : any) => {
        // console.log(estate.payload.doc.data());
        let details = estate.payload.doc.data();
        return{
          id: estate.payload.doc.id,
          city: details.city,
          street: details.street,
          price: details.price,
          type: details.type,
          class: details.class,
          sfootage: details.sfootage,
          rooms: details.rooms,
          floor: details.floor,
          bildYear: details.bildYear, 
          garage: details.garage, 
          elevator: details.elevator, 
          basement: details.basement, 
          links: details.links  
        } as IEstate
      });
    }, error =>{
      console.log(error);
    });
  }
}

