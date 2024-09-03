import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const _NgxSpinnerService= inject(NgxSpinnerService)


  if(req.url.includes('products') || req.url.includes('categories') ||  req.url.includes('signup') || req.url.includes('signin')){
    _NgxSpinnerService.show()
  }
  // else if( req.url.includes('signup') || req.url.includes('signin')){
  //   _NgxSpinnerService.show('loading-2')
  // }
  else{
    _NgxSpinnerService.show('loading-1')
  }
  


  return next(req).pipe( finalize( ()=>{


    _NgxSpinnerService.hide()
    _NgxSpinnerService.hide('loading-1')
    _NgxSpinnerService.hide('loading-2')
  }));
};
