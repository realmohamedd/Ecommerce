import { Component, inject, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubCategoriesService } from '../../core/service/sub-categories.service';

import { ICategory } from '../../core/interfaces/icategory';
import { CategoriesService } from '../../core/service/categories.service';
import { ISubCat } from '../../i-sub-cat';

@Component({
  selector: 'app-details-category',
  standalone: true,
  imports:[RouterLink],
  templateUrl: './details-category.component.html',
  styleUrls: ['./details-category.component.scss']
})
export class DetailsCategoryComponent implements OnInit, OnDestroy {

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _SubCategoriesService = inject(SubCategoriesService);
  private readonly _CategoriesService = inject(CategoriesService);

  getSubCat!: Subscription;
  detailsSubCatList: ISubCat[] = [];
  categoryList: WritableSignal<ICategory[]> = signal([]);
  
  idCategory: string | null = '';
  categoryName: string | null = ''; // This will hold the category name

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.idCategory = params.get('id');
        
        if (this.idCategory) {
          // Load categories and subcategories after the ID is retrieved
          this._CategoriesService.getAllCategories().subscribe({
            next: (res) => {
              this.categoryList.set(res.data || []);
              this.getCategoryNameById(this.idCategory!);
            },
            error: (err) => {
              console.log(err);
            }
          });

          this.loadSubCategories(this.idCategory);
        }
      }
    });
  }

  getCategoryNameById(idCategory: string): void {
    const category = this.categoryList().find(cat => cat._id === idCategory);
    this.categoryName = category ? category.name : 'Unknown Category';
  }

  loadSubCategories(idCategory: string): void {
    this.getSubCat = this._SubCategoriesService.getSubCategories(idCategory).subscribe({
      next: (res) => {
        this.detailsSubCatList = res.data || [];
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.getSubCat?.unsubscribe();
  }
}
