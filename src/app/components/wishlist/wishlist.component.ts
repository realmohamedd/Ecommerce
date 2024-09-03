import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../core/service/wish-list.service';
import { CurrencyPipe, NgFor } from '@angular/common';
import { IwishList } from '../../core/interfaces/iwish-list';
import { CartService } from '../../core/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [NgFor, CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit{
  private readonly _WishListService = inject(WishListService);
  private readonly _CartService= inject(CartService);
  private readonly _ToastrService=inject(ToastrService)


  wishListDetails: IwishList[] = [];
  isLoading: { [productId: string]: boolean } = {};  

  ngOnInit(): void {
    this._WishListService.getProductsWishList().subscribe({
      next: (res) => {
        console.log(res.data);
        this.wishListDetails = res.data;
        
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  removeProduct(id: string): void {
    this._WishListService.removeProductFromWishList(id).subscribe({
      next: (res) => {
        console.log(res);
        this.wishListDetails = this.wishListDetails.filter(item => item.id !== id);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addCart(id: string): void {
    if (!this.isLoading[id]) {  
      this.isLoading[id] = true; 
  
      this._CartService.addProductToCart(id).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading[id] = false;  
          this._ToastrService.success(res.message, 'FrechCart')
          this._CartService.cartNumber.set(res.numOfCartItems)
        }
  
        
      });
    }
  }
}
