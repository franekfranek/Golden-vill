import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService, IEstate } from 'src/app/_services/firebase.service';

@Component({
  selector: 'app-estate-details',
  templateUrl: './estate-details.component.html',
  styleUrls: ['./estate-details.component.scss']
})
export class EstateDetailsComponent implements OnInit {
  estate: IEstate;
  id: any;

  constructor(private route: ActivatedRoute,
              private firebaseService: FirebaseService) {
    this.id = this.route.snapshot.paramMap.get('id'); //get id parameter
   }

  ngOnInit(): void {
    this.getEstate(this.id)
  }

  getEstate(id: any){
    this.firebaseService.getEstateById(id).subscribe(data =>{
      this.estate = data as IEstate;
      console.log(this.estate);
    })
  }

}
