import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) {}

  public async getRandomPicture(categoryName) {
    switch (categoryName) {
      case 'Sport':
        categoryName = 'sports';
        break;
      case 'Essen':
        categoryName = 'food';
        break;
      case 'Natur':
        categoryName = 'nature';
        break;
      case 'Sprachen':
        categoryName = 'language';
        break;
      case 'Musik':
        categoryName = 'music';
        break;
      case 'Kreatives':
        categoryName = 'design';
        break;
      case 'Denksport':
        categoryName = 'thinking';
        break;
      case 'Gesellschaft':
        categoryName = 'groups';
        break;
      case 'Technisches':
        categoryName = 'technology';
        break;
      case 'Spiele':
        categoryName = 'game';
        break;
      case 'Tiere':
        categoryName = 'animal';
        break;

      default:
        categoryName = 'abstract';
        break;
    }

    let data = await fetch(`/api/image?categoryName=${categoryName}`);
    return data.json();
  }
}
