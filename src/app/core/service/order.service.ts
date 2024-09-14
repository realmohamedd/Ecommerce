import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _HttpClient:HttpClient) { }

  myHeaders:any={token: localStorage.getItem('userToken')}

  url = window.location.origin;

  checkOut(idCart:string|null, shippingDetails:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=${this.url}`,
      {
        "shippingAddress":shippingDetails
    },
  
    )
  }

  getUserOrders(id: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`, 
    
  );
  }
}
