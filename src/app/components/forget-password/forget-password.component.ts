import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf,NgFor],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)

  isLoading: boolean = false;
  step:number = 1;

  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)])
  });

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
  });


  verifyEmailSubmit():void{
    
    let emailValue = this.verifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(emailValue)



    if(this.verifyEmail.valid){
      this.isLoading = true;
      this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
        next:(res)=>{
          console.log(res)
          
          if(res.statusMsg === 'success'){
            
            this.step = 2
          }
          this.isLoading = false;
        },
        error:(err)=>{
          console.log(err)
        }
      })
      
    }
    
  }

  verifyCodeSubmit():void{
    if(this.verifyCode.valid){
      this.isLoading = true;
      this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.status === 'Success'){
            this.step = 3
          }
          this.isLoading = false;
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
    
  }

  resetPasswordSubmit():void{
    if(this.resetPassword.valid){
      this.isLoading = true;
      this._AuthService.setResetPassword(this.resetPassword.value).subscribe({
        next:(res)=>{
          console.log(res)
          localStorage.setItem('userToken' , res.token);
  
          this._AuthService.saveUserData();
  
          this._Router.navigate(['/home'])

          this.isLoading = false;
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
  
  }
}
