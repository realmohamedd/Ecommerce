import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {

  constructor(private _HttpClient: HttpClient) { }

  getSubCategories(id:string | null):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${id}/subcategories`)
  }

  getSpecificCategory(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/subcategories/${id}`)
  }
}
