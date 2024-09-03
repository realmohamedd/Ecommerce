import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    canActivate: [logedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent),
      },
      {
        path: 'forget',
        loadComponent: () => import('./components/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent),
      },
    ],
  },
  {
    path: '',
    loadComponent: () => import('./layouts/blank-layout/blank-layout.component').then(m => m.BlankLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'products',
        loadComponent: () => import('./components/product/product.component').then(m => m.ProductComponent),
      },
      {
        path: 'cart',
        loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent),
      },
      {
        path: 'brands',
        loadComponent: () => import('./components/brands/brands.component').then(m => m.BrandsComponent),
      },
      {
        path: 'wishlist',
        loadComponent: () => import('./components/wishlist/wishlist.component').then(m => m.WishlistComponent),
      },
      
      {
        path: 'categories',
        loadComponent: () => import('./components/categories/categories.component').then(m => m.CategoriesComponent),
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./components/details/details.component').then(m => m.DetailsComponent),
      },
      {
        path: 'detailsCategory/:id',
        loadComponent: () => import('./components/details-category/details-category.component').then(m => m.DetailsCategoryComponent),
      },
      {
        path: 'allorders',
        loadComponent: () => import('./components/all-orders/all-orders.component').then(m => m.AllOrdersComponent),
      },
      {
        path: 'orders/:id',
        loadComponent: () => import('./components/orders/orders.component').then(m => m.OrdersComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./components/notfound/notfound.component').then(m => m.NotfoundComponent),
  },
];
