import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  constructor(private _HttpClient: HttpClient) {}

  cartNumberWish: WritableSignal<number> = signal(0)


  addProductToWishList(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`, {
      productId: id
    });
  }

  removeProductFromWishList(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`);
  }

  getProductsWishList():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
  }
}
