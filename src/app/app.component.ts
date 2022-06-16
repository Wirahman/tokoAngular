import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Latihan CRUD Angular';
  email: string | undefined | null;

  constructor(
    private router: Router
  ) { }

  ngOnInit(){
    this.checkSessionLogin();
    this.email = this.readLocalStorageValue('email');
  }

  checkSessionLogin() {
    if(localStorage.getItem('email') != undefined){
      this.router.navigate(['/Pengguna']);
    }else{
      this.router.navigate(['/']);
    }
  }

  readLocalStorageValue(key: string): string | undefined | null {
      return localStorage.getItem(key);
  }

  menuPengguna(){
    this.router.navigate(['/Pengguna']);
  }

  menuProduct(){
    this.router.navigate(['/Product']);    
  }
  
  onLogout(){
    localStorage.clear();
    // this.router.navigate(['/']); 
    this.ngOnInit();
  }

  checkSession(){  
    console.log("sessionObject");
    console.log(localStorage.getItem('sessionObject'));
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
  }

}
