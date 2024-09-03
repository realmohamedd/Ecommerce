import { fileURLToPath } from 'node:url';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/service/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy{

  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _OrderService=inject(OrderService)

  checkOut!:Subscription;

  orders:  FormGroup = new FormGroup({
    details:new FormControl(null,[Validators.required]),
    phone : new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city:new FormControl (null, [Validators.required])
  })

cartId :string| null = ''
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(p)=>{
          this.cartId = p.get('id')

          console.log(this.cartId)
        }
      })
  }


  orderSubmit():void{
    console.log(this.orders.value)
    this.checkOut= this._OrderService.checkOut(this.cartId,this.orders.value ).subscribe({
      next:(res)=>{
        if(res.status === "success"){
          window.open(res.session.url, '_self')
        }
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  ngOnDestroy(): void {
      this.checkOut?.unsubscribe()
  }
}
