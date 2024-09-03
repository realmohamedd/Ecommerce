import { CategoriesService } from './../../core/service/categories.service';
import { Component, Inject, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/service/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/Pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { WishListService } from '../../core/service/wish-list.service';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink, SearchPipe, FormsModule, TranslateModule,NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{

  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
  private readonly _WishListService=inject(WishListService)
  // productList:Iproduct[] = [];
  productList:WritableSignal<Iproduct[]> = signal([]);
  // categoryList:ICategory[] = [];
  categoryList:WritableSignal<ICategory[]> = signal([])
  getAllProductSub !:Subscription;
  // isLoading:boolean = false;
  text:string = '';


  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl:true,
    autoplay:true, // when open site slider animate
    autoplayTimeout:3000, // animate every 3s
    autoplayHoverPause:true, // when hover by mouse slider stop 
    dots: false,
    navSpeed: 700,
    navText: ['',''],
    items:1,
    nav: true
  }

  customOptionsCategory: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl:true,
    autoplay:true, // when open site slider animate
    autoplayTimeout:3000, // animate every 3s
    autoplayHoverPause:true, // when hover by mouse slider stop 
    dots: false,
    navSpeed: 700,
    navText: [`<i class="fa-solid fa-chevron-left text-main"></i>`, `<i class="fa-solid fa-chevron-right text-main"></i>`],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  ngOnInit(): void {

    // this._NgxSpinnerService.show('loading-3')
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.categoryList.set(res.data);
        // this._NgxSpinnerService.hide('loading-3')
      },
      
    })
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
  }

  wishlist: { [key: string]: boolean } = {};
  toggleWishList(id: string): void {
    this.wishlist[id] = !this.wishlist[id];
    if (this.wishlist[id]) {
      this.addToWishList(id);
    } else {
      this.removeFromWishList(id);
    }
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
  }
}
