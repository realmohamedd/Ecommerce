import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../core/service/order.service';
import { AuthService } from '../../core/service/auth.service';
import { IAllorder } from '../../core/inerfaces/i-allorder';
import { CurrencyPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [NgFor,NgIf,NgClass, DatePipe, CurrencyPipe],
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {

  private readonly _OrderService = inject(OrderService);
  private readonly _AuthService = inject(AuthService);

  orders: IAllorder[] = []; // Store the orders with the IAllorder interface

  getUserInfo(id: string): void {
    this._OrderService.getUserOrders(id).subscribe({
      next: (res: IAllorder[]) => { // Expecting an array of orders
        this.orders = res;
        console.log(this.orders);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this._AuthService.saveUserData(); // Make sure userData is populated
    const userId = this._AuthService.userData?.id; // Retrieve the user ID from AuthService

    if (userId) {
      this.getUserInfo(userId); // Fetch orders using the user ID
    } else {
      console.log('User ID not found');
    }
  }
}
