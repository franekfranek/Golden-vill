import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEstate } from '../Models/IEstate';
import { EstateService } from '../_services/estate.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  result: IEstate[] = [];

  constructor(private estateService: EstateService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void{
    this.form = this.fb.group({
      local: ['', Validators.required],
      priceFrom: ['', Validators.required],
      priceTo: ['', Validators.required],
      type: ['', Validators.required],
      class: ['', Validators.required]
    })
  }

  search(){
    this.estateService.getByFilters(this.form).valueChanges().subscribe(res =>{
      console.log(res);
      this.result = res;
    });
    
  }

}
