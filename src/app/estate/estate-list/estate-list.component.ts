import { Component, OnInit } from '@angular/core';
import { IEstate } from 'src/app/Models/IEstate';
import { EstateService } from 'src/app/_services/estate.service';

@Component({
  selector: 'app-estate-list',
  templateUrl: './estate-list.component.html',
  styleUrls: ['./estate-list.component.scss']
})
export class EstateListComponent implements OnInit {
  estates: IEstate[];

  constructor(private estateService: EstateService) { }

  ngOnInit(): void {
  }

  loadEstates(){
    this.estateService.getEstates().subscribe((res) =>{
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
