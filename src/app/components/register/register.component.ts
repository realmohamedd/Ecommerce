import { NgClass, NgFor, NgIf } from '@angular/common';
import { AuthService } from './../../core/service/auth.service';
import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { log } from 'console';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass,NgIf,NgFor],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{

  // Api 

  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  msgSuccess :boolean= false;

  msgError:string="";

  isLoading:boolean = false;

  registerSub !: Subscription;
  // reactive form
 // create form --> 
      // 1- ts --> create group --> controls
      // 2- html design

  // validators 
  registerForm:FormGroup = this._FormBuilder.group({
    name:[null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    email : [null , [Validators.required, Validators.email]],
    password : [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    rePassword : [null],
    phone:[null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, {validators:this.confirmPassword})
  // registerForm: FormGroup= new FormGroup({
  //   name : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
  //   email : new FormControl(null, [Validators.required, Validators.email]),
  //   password : new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  //   rePassword: new FormControl(null),
  //   phone : new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  // },this.confirmPassword)

  registerSubmit():void{
    if(this.registerForm.valid){

      this.isLoading = true;

     this.registerSub =  this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.message == 'success'){
            this.msgSuccess = true;
            setTimeout(() => {
              this._Router.navigate(['/login'])
            }, 1000);
           
          }

          this.isLoading = false;
        },
        error:(err)=>{
          this.msgError = err.error.message;
          this.isLoading = false;
          console.log(err)
        }
      })
      console.log(this.registerForm)
    }
    else{
      this.registerForm.setErrors({mismatch:true});
      this.registerForm.markAllAsTouched()
    }
    
    
  }

  ngOnDestroy(): void {
      this.registerSub?.unsubscribe()
  }
  confirmPassword(g: AbstractControl){
    if(g.get('password')?.value === g.get('rePassword')?.value){
      return null;
    }
    else{
      return {mismatch:true}
    }
  }
  showPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    
  }
    
}
