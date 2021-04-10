import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService, IEstate } from '../_services/firebase.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  result: IEstate[] = [];

  constructor(private firebaseService: FirebaseService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void{
    this.form = this.fb.group({
      local: ['', Validators.required],
      priceFrom: ['', Validators.required],
      priceTo: ['', Validators.required],
      type: ['', Validators.required],
      class: ['', Validators.required],
      rooms: [''],
    })
  }

  search(){
    this.firebaseService.getByFilters(this.form).valueChanges().subscribe(x =>{
      this.result = x;
    });
    
  }

}
