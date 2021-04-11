import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEstate } from 'src/app/Models/IEstate';
import { AuthService } from 'src/app/_services/auth.service';
import { EstateService } from 'src/app/_services/estate.service';

@Component({
  selector: 'app-estate-details',
  templateUrl: './estate-details.component.html',
  styleUrls: ['./estate-details.component.scss']
})
export class EstateDetailsComponent implements OnInit {
  estate: IEstate;
  id: any;

  constructor(private route: ActivatedRoute,
              private estateService: EstateService) {
    this.id = this.route.snapshot.paramMap.get('id'); //get id parameter
   }

  ngOnInit(): void {
    this.getEstate(this.id)
  }

  getEstate(id: any){
    this.estateService.getEstateById(id).subscribe(data =>{
      this.estate = data as IEstate;
      console.log(this.estate);
    })
  }

}
