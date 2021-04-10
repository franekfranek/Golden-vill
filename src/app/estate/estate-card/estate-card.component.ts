import { Component, Input, OnInit } from '@angular/core';
import { IEstate } from 'src/app/_services/firebase.service';

@Component({
  selector: 'app-estate-card',
  templateUrl: './estate-card.component.html',
  styleUrls: ['./estate-card.component.scss']
})
export class EstateCardComponent implements OnInit {
  @Input() estate: IEstate;
  formattedEstate: IEstate;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.estate);
    this.formatData(this.estate);
  }

  formatData(estate: IEstate){
    this.formattedEstate = {
      city: estate.city,
      street: estate.street,
      price: estate.price,
      type: (estate.type ==='flat') ? "Mieszkanie" : (estate.type ==='house') ? "Dom" : "Grunt",
      class: (estate.class ==='sell') ? "Sprzedaż" : (estate.class ==='rent') ? "Wynajem" : "Dzierżawa",
      sfootage: estate.sfootage,
      rooms: estate.rooms,
      floor: estate.floor,
      bildYear: estate.bildYear, 
      garage: estate.garage, 
      elevator: estate.elevator, 
      basement: estate.basement, 
      links: estate.links
    }
  }

}
