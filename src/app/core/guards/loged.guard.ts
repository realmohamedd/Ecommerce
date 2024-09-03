import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router)
  const _PLATFORM_ID=inject(PLATFORM_ID)
  // check Type Global Object !== undefined

  if(isPlatformBrowser(_PLATFORM_ID)){
        if(localStorage.getItem('userToken') !== null){
          _Router.navigate(['/home'])
          return false;
        }
        else{
      
          
          return true;
        }
  }
  else{
    return false;
  }
  
};
