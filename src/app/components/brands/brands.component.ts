import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../core/service/brand.service';
import { IBrands } from '../../core/interfaces/i-brands';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [NgIf],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{

  private readonly _BrandService = inject(BrandService);
  brandsList: IBrands[]=[];
  ngOnInit(): void {
      this._BrandService.getAllBrands().subscribe({
        next:(res)=>{
          this.brandsList=res.data;
          console.log(res)
        },
        error:(err)=>{
          console.log(err)
        }
      })
  }

  selectedStore: IBrands | null = null;
  openModal(store: IBrands): void {
    this.selectedStore = store;
    console.log(this.selectedStore);  // Add this line to debug
  }
  

  closeModal(): void {
    this.selectedStore = null;
  }
}
