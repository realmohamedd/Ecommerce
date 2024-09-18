import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/service/products.service';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/Pipes/search.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, NgModel } from '@angular/forms';
import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { WishListService } from '../../core/service/wish-list.service';

@Component({
  selector: 'app-product',
  standalone: true,
  
  imports: [RouterLink, SearchPipe, TranslateModule, FormsModule,NgIf,NgFor,NgClass, CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit, OnDestroy{

  private readonly _ProductsService= inject(ProductsService)
  private readonly _CartService= inject(CartService)
  private readonly _ToastrService= inject(ToastrService)
  private readonly _WishListService = inject(WishListService)

  getAllProductSub !:Subscription;
  productList:WritableSignal<Iproduct[]> = signal([]);
  text:string = "";

  ngOnInit(): void {

    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      this.wishlist = JSON.parse(savedWishlist);
    }
      // call api
      this.getAllProductSub = this._ProductsService.getAllProducts().subscribe({
        next:(res)=>{
          console.log(res.data)
          this.productList.set(res.data);
        }
      })
  }

  ngOnDestroy(): void {
    this.getAllProductSub?.unsubscribe()
}

isLoading: { [productId: string]: boolean } = {};  

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


wishlist: { [key: string]: boolean } = {};


addToWishList(id:string):void{
  this._WishListService.addProductToWishList(id).subscribe({
    next:(res)=>{
      console.log(res)
      this._ToastrService.success(res.message, 'FrechCart');
    },
    error:(err)=>{
      console.log(err)
      this._ToastrService.error(err.message , 'FrechCart') 
    }
  })

  console.log(`Product ${id} added to wishlist`);
}


toggleWishList(id: string): void {
  this.wishlist[id] = !this.wishlist[id];
  if (this.wishlist[id]) {
    this.addToWishList(id);
  } else {
    this.removeFromWishList(id);
  }
  
  // Save the updated wishlist to localStorage
  localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
}

removeFromWishList(id: string): void {
  this._WishListService.removeProductFromWishList(id).subscribe({
    next: (res) => {
      console.log(res);
      this._ToastrService.success(res.message , 'FrechCart')
    },
    error: (err) => {
      console.log(err);
    },
  });

  console.log(`Product ${id} removed from wishlist`);
}



}
