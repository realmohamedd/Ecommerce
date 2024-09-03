import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MytranslateService {

  private readonly _TranslateService= inject(TranslateService)
  private readonly _plat_id= inject(PLATFORM_ID)
  
private readonly _RendererFactory2=  inject(RendererFactory2).createRenderer(null, null)

  constructor() { 
    // 1. get lang local
    if(isPlatformBrowser(this._plat_id)){
      let savedLang = localStorage.getItem('lang');

      //2. Set Default lang
      this._TranslateService.setDefaultLang('en');
  
      // 3. use lang ---> local
    if(savedLang !== null){
      this._TranslateService.use(savedLang!)
    }
      
      
  
      this.changeDirection()
    }
    
  }

  changeDirection():void{
    let savedLang = localStorage.getItem('lang');
    if(savedLang === "en"){
      this._RendererFactory2.setAttribute(document.documentElement, 'dir','ltr');
      this._RendererFactory2.setAttribute(document.documentElement, 'lang','en')
    }
    else if(savedLang === "ar"){
      this._RendererFactory2.setAttribute(document.documentElement, 'dir','rtl')
      this._RendererFactory2.setAttribute(document.documentElement, 'lang','arr')
    }
  }

  changeLang(lang:string){
    if(isPlatformBrowser(this._plat_id)){
      localStorage.setItem('lang', lang);

      this._TranslateService.use(lang);
  
      this.changeDirection()
    }
    
  }
}
