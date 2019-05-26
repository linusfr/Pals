import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { cloudinary } from 'cloudinary';

// let cloudinary = require('cloudinary').v2;

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) {}

  public uploadImage() {
    // parameter -> image: File
    // const formData = new FormData();

    // console.log(image);

    const params = {
      params: new HttpParams()
        .append('cloud_name', 'dejvimnnm')
        .append('api_key', '398537455597268')
        .append('api_secret', 'KEueI7QcRDYEpXEe7Ky88iVaVtc')
    };

    let url =
      'https://api.cloudinary.com/v1_1/dejvimnnm/image/upload?callback=foo';

    cloudinary.uploader.upload('~/Downloads/test.jpg', function(error, result) {
      console.log(result);
    });

    // return this.http.post('/api/image/upload', image);
    return this.http.post(url, image);
  }
}
