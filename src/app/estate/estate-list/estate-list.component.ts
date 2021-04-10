import { Component, OnInit } from '@angular/core';
import { FirebaseService, IEstate } from 'src/app/_services/firebase.service';

@Component({
  selector: 'app-estate-list',
  templateUrl: './estate-list.component.html',
  styleUrls: ['./estate-list.component.scss']
})
export class EstateListComponent implements OnInit {
  estates: IEstate[];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
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
          links: details.links
        } as IEstate
      });
    }, error =>{
      console.log(error);
    });
  }
}
