import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService, IEstate } from 'src/app/_services/firebase.service';

@Component({
  selector: 'app-estate-create',
  templateUrl: './estate-create.component.html',
  styleUrls: ['./estate-create.component.scss']
})
export class EstateCreateComponent implements OnInit {

  public form: FormGroup;
  public estates: IEstate[] = [];
  public estateDetails: IEstate | undefined ;


  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.getEstates();
  }

  getEstates(): void {
    this.firebaseService.getEstates().subscribe((res) =>{
      this.estates = res.map((estate : any) => {
        console.log(estate);
        console.log(estate.payload.doc.data());
        let details = estate.payload.doc.data();
        return{
          id: estate.payload.doc.id,
          city: details.city,
          street: details.street,
        } as IEstate
      });
    });
  }

  openModal(content: TemplateRef<any>, estateId: string | undefined): void{
    this.estateDetails = this.estates.find((estate: IEstate) => estate.id === estateId);

    this.formInit(this.estateDetails);
    this.modalService.open(content, { backdrop: 'static', centered: true });
  }

  formInit(data: IEstate | undefined): void{
    this.form = this.fb.group({
      city: [data ? data.city : '', Validators.required],
      street: [data ? data.street : '', Validators.required]
    })
  }

  addEstate(): void{
    this.firebaseService.addEstate(this.form.value).then();
  }
  
  updateEstate(estateId: string | undefined): void{
    this.firebaseService.updateEstate(estateId, this.form.value).then();
  }
  
  removeEstate(estateId: string | undefined): void{
    console.log(estateId);
    this.firebaseService.deleteEstate(estateId).then();
  }


  createNewEstate(){
    console.log('hej');
  }

  cancel(){
    console.log('cancel');
  }
}
