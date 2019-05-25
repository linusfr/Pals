import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) {}

  public uploadImage(image: File) {
    const formData = new FormData();

    console.log(image);
    // formData.append('image', image);

    let url =
      'https://api.cloudinary.com/v1_1/dejvimnnm/image/upload?callback=foo';

    // return this.http.post('/api/image/upload', image);
    return this.http.post(url, image);
  }
}
