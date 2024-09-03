import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/service/cart.service';
import { ICart } from '../../core/interfaces/i-cart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  private readonly _CartService= inject(CartService);
  private readonly _ToastrService= inject(ToastrService);

  cartDetails : ICart = {} as ICart;

  ngOnInit(): void {
      this._CartService.getProductsCart().subscribe({
        next:(res)=>{
          console.log(res.data)
          this.cartDetails = res.data
        },
        error:(err)=>{
          console.log(err)
        }
      })
  }

  removeItem(id:string):void{
    this._CartService.deleteSpecificCartItem(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.cartDetails = res.data;
        this._ToastrService.success('Product removed successfully from your cart', 'FrechCart')
        this._CartService.cartNumber.set(res.numOfCartItems)
      },
      error:(err)=>{
        this._ToastrService.error('Product not removed from your cart.  Please try again.', 'FrechCart')
        console.log(err)
      }
    })
  }

  updateCount(id:string , newCount:number):void{
   
    this._CartService.updateProductQuantity(id , newCount).subscribe({
      next:(res)=>{
        console.log(res)
        this.cartDetails = res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }


  clearItems():void{
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res)
        if(res.message == "success"){
          this.cartDetails = {} as ICart
          this._CartService.cartNumber.set(0)
        }
        this._ToastrService.success('Your cart has been cleared.', 'FrechCart');
      },
      error:(err)=>{
        console.log(err)
        this._ToastrService.error('Failed to clear the cart. Please try again.', 'FrechCart');
      }
    })
  }
}
