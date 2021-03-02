import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService, IEstate } from 'src/app/_services/firebase.service';
import { CloudinaryService } from 'src/app/_services/cloudinary.service';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, finalize, switchMap } from 'rxjs/operators';
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
    private firebaseService: FirebaseService,
    private cloudinary: CloudinaryService 
  ) { }

  ngOnInit(): void {
    this.getEstates();
  }

  getEstates(): void {
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

  addEstate(links: string[]): Observable<any>{
    // this.form.addControl('urls', new FormControl(urls));
    let data = {
      city: this.form.value.city,
      street: this.form.value.street,
      links: links
    } as IEstate;

    return from(this.firebaseService.addEstate(data))
    // this.firebaseService.addEstate(data).then((res) =>{
    //   console.log(res);
    // });
  }
  
  updateEstate(estateId: string | undefined): void{
    this.firebaseService.updateEstate(estateId, this.form.value).then();
  }
  
  removeEstate(estateId: string | undefined): void{
    console.log(estateId);
    this.firebaseService.deleteEstate(estateId).then();
  }

  handleSaveEstate() {
    let result: string[];
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
  

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    console.log(this.files);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  
}
