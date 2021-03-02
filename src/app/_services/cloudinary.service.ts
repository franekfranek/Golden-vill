import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor(private http: HttpClient) {}

   uploadImage(vals: any): Observable<any>{
    return this.http
    .post('https://api.cloudinary.com/v1_1/dv3imnwp0/image/upload', vals)
   }

}
