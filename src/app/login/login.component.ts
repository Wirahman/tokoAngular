import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import '@cds/core/forms/register.js';
import '@cds/core/input/register.js';
import '@cds/core/password/register.js';
import '@cds/core/button/register.js';

import { AppComponent } from '../app.component';
import { LoginModule } from './model/login.module';
import { LoginService } from './service/login.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginPengguna: LoginModule = new LoginModule();
  alertValidasi: string = '';

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private AppComponent: AppComponent,
    private LoginService: LoginService,
    ){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  onLogin() {
    console.log("Function On Login");
    if (this.form.valid) {
      console.log(this.form.value);
      this.loginPengguna = this.form.value;
      this.LoginService.onLogin(this.loginPengguna).subscribe(
        (data: any) => {
          console.log("Data return");
          console.log(data);
          if(data.access_token != undefined){
            this.alertValidasi = '';
            //Setting session
            // Pasang Session menggunakan object
            var sessionObject ={
              token:data.access_token, 
              refresh_token:data.refresh_token,
              email:data.email, 
              first_name:data.first_name,
              last_name:data.last_name, 
              avatar:data.avatar,
            };
            localStorage.setItem('sessionObject', JSON.stringify(sessionObject));
            console.log("sessionObject");
            console.log(localStorage.getItem('sessionObject'));
            
            // Pasang Session per item
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('first_name', data.user.first_name);
            localStorage.setItem('last_name', data.user.last_name);
            localStorage.setItem('avatar', data.user.avatar);
            // Get Session per Item
            console.log("Token");
            console.log(localStorage.getItem('token'));
            console.log("Refresh Token");
            console.log(localStorage.getItem('refresh_token'));
            console.log("Email");
            console.log(localStorage.getItem('email'));
            console.log("Nama Depan");
            console.log(localStorage.getItem('first_name'));
            console.log("Nama Belakang");
            console.log(localStorage.getItem('last_name'));
            console.log("Avatar");
            console.log(localStorage.getItem('avatar'));
            // this.router.navigate(['/Pengguna']);
            this.AppComponent.ngOnInit();
          }else{
            this.alertValidasi = '';
            this.alertValidasi = 'Email tidak terdaftar atau Password anda salah';
          }

        }
      );
    }
  }




}
