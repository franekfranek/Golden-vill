import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CloudinaryService } from 'src/app/_services/cloudinary.service';
import { forkJoin, from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IEstate } from 'src/app/Models/IEstate';
import { AuthService } from 'src/app/_services/auth.service';
import { EstateService } from 'src/app/_services/estate.service';
@Component({
  selector: 'app-estate-create',
  templateUrl: './estate-create.component.html',
  styleUrls: ['./estate-create.component.scss'],
  providers: [CloudinaryService]
})
export class EstateCreateComponent implements OnInit {

  form: FormGroup;
  estates: IEstate[] = [];
  estateDetails: IEstate | undefined ;
  files: File[] = [];

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private estateService: EstateService,
    private cloudinary: CloudinaryService,
    private authService: AuthService 
  ) { }

  ngOnInit(): void {
    this.getEstates();
  }

  formInit(data: IEstate | undefined): void{
    this.form = this.fb.group({
      city: [data ? data.city : '', Validators.required],
      street: [data ? data.street : '', Validators.required],
      price: [data ? data.price : '', Validators.required],
      type: [data ? data.type : '', Validators.required],
      class: [data ? data.class : '', Validators.required],
      sfootage: [data ? data.sfootage : '', Validators.required],
      rooms: [data ? data.rooms : '', Validators.required],
      floor: [data ? data.floor : '', Validators.required],
      bildYear: [data ? data.bildYear : '', Validators.required],
      garage: [data ? data.garage : '', Validators.required],
      elevator: [data ? data.elevator : '', Validators.required],
      basement: [data ? data.basement : '', Validators.required],
    })
  }

  openModal(content: TemplateRef<any>, estateId: string | undefined): void{
    this.estateDetails = this.estates.find((estate: IEstate) => estate.id === estateId);

    this.formInit(this.estateDetails);
    this.modalService.open(content, { backdrop: 'static', centered: true });
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    console.log(this.files);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  logout(){
    this.authService.logout();
  }

  getEstates(): void {
    this.estateService.getEstates().subscribe((res) =>{
      
      this.estates = res.map((estate : any) => {
        let details = estate.payload.doc.data();
        return{
          id: estate.payload.doc.id,
          city: details.city,
          street: details.street,
          price: details.price,
          links: details.links
        } as IEstate
      });
    });
  }

  addEstate(links: string[]): Observable<any>{
    console.log(this.form);
    let data = {
      city: this.form.value.city,
      street: this.form.value.street,
      price: this.form.value.price,
      type: this.form.value.type,
      class: this.form.value.class,
      sfootage: this.form.value.sfootage,
      rooms: this.form.value.rooms,
      floor: this.form.value.floor,
      bildYear: this.form.value.bildYear, 
      garage: this.form.value.garage, 
      elevator: this.form.value.elevator, 
      basement: this.form.value.basement, 
      links: links
    } as IEstate;

    return from(this.estateService.addEstate(data))
  }
  
  updateEstate(estateId: string | undefined): void{
    this.estateService.updateEstate(estateId, this.form.value).then();
  }
  
  removeEstate(estateId: string | undefined): void{
    console.log(estateId);
    this.estateService.deleteEstate(estateId).then();
  }

  handleSaveEstate() {
    this.uploadToCloudinary().pipe(
      switchMap(urls => this.addEstate(urls))
    ).subscribe({
      next: (res) => {
        console.log(res);  // <-- response from `this.firebaseService.addEstate()`
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete')
      }
    });
  }

  uploadToCloudinary(){
    // let urls : {[n: number]: string} = {};
    // let urls: string[] = [];
    
    // for (let i = 0; i < this.files.length; i++) {
    //   data.append('file', this.files[i]);
    //   data.append('upload_preset', 'golden_vill_upload')
    //   data.append('cloud_name', 'dv3imnwp0')

    //   this.cloudinary.uploadImage(data).subscribe(res =>{
    //     // urls[i] = res.secure_url;
    //     urls.push(res.secure_url); 
    //     // this.urls.pipe(map(arr => {
    //     //   arr.push(res.secure_url);
    //     //   return arr;
    //     // }));
    //   });
    // }
    return forkJoin(
      this.files.map(file => {
        const data = new FormData();

        data.append('file', file);
        data.append('upload_preset', 'golden_vill_upload')
        data.append('cloud_name', 'dv3imnwp0')
        return this.cloudinary.uploadImage(data).pipe(
          map(res =>{
            console.log(res.secure_url);
            return res.secure_url;
          } )
        );
      })
    );
  }
  
  
}
