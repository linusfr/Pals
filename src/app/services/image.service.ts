import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor() {}

  public uploadImage(image: File) {
    const formData = new FormData();

    console.log(image);
    formData.append('image', image);
    return image;

    // return this.http.post('/api/v1/image-upload', formData);
  }
}
