import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/service/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  private readonly _CategoriesService = inject(CategoriesService);
  categoryList:WritableSignal<ICategory[]> = signal([])


 
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.categoryList.set(res.data);
        // this._NgxSpinnerService.hide('loading-3')
      },
      
    })
  }





  // counter:WritableSignal<number> = signal(0)
  // userName:WritableSignal<string> = signal("med")


  // changeUserName():void{
  //   this.userName.set("mohamed")
  // }

  // changeCounter():void{
  //   this.counter.update( (value)=> value+1);
  // }
}
