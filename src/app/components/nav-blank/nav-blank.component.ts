import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { CartService } from '../../core/service/cart.service';
import { NgIf } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/service/mytranslate.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, NgIf, TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit{

  readonly _AuthService= inject(AuthService)
  readonly _MytranslateService= inject(MytranslateService)
  readonly _TranslateService= inject(TranslateService)
  readonly _CartService= inject(CartService)

  
  countNumber:Signal<number> = computed( ()=> this._CartService.cartNumber())

  ngOnInit(): void {


    this._CartService.getProductsCart().subscribe({
      next:(res)=>{
        this._CartService.cartNumber.set(res.numOfCartItems)
      }
    })


      
  }
  
  change(lang:string):void{
    this._MytranslateService.changeLang(lang)
  }
  
}
