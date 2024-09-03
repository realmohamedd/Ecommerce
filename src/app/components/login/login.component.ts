import { NgClass } from '@angular/common';
import { AuthService } from './../../core/service/auth.service';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { log } from 'console';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  msgSuccess :boolean= false;

  msgError:string="";

  isLoading:boolean = false;
  // reactive form
 // create form --> 
      // 1- ts --> create group --> controls
      // 2- html design

  // validators 
  loginForm:FormGroup = this._FormBuilder.group({
    email : [null , [Validators.required, Validators.email]],
    password : [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  })
  // loginForm: FormGroup= new FormGroup({
  //   name : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
  //   email : new FormControl(null, [Validators.required, Validators.email]),
  //   password : new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  //   rePassword: new FormControl(null),
  //   phone : new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  // },this.confirmPassword)

  loginSubmit():void{
    if(this.loginForm.valid){

      this.isLoading = true;

      this._AuthService.setLoginForm(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.message == 'success'){
            this.msgSuccess = true;
            setTimeout(() => {

              //1. Save Token
              localStorage.setItem('userToken',res.token)

              // 2. Decode Token
              this._AuthService.saveUserData()

              // 3. Navigate to home
              this._Router.navigate(['/home'])
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
      console.log(this.loginForm)
    }
    else{
      this.loginForm.setErrors({mismatch:true});
      this.loginForm.markAllAsTouched()
    }
    
    
  }
 
 
}
