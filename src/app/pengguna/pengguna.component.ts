import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PenggunaModule} from "./model/pengguna.module";
import { PenggunaService } from './service/pengguna.service';

@Component({
  selector: 'app-pengguna',
  templateUrl: './pengguna.component.html',
  styleUrls: ['./pengguna.component.css']
})

export class PenggunaComponent implements OnInit {
  pengguna: any = [];
  currentIndex = -1;
  pages: 1 = 1;
  title = '';
  page = 1;
  count = 0;
  pageSize = 3;
  
  constructor(
    private router: Router,
    private penggunaService: PenggunaService,
  ) { }

  ngOnInit(): void {
    this.getSemuaPengguna();
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getSemuaPengguna();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page;
    }

    if (pageSize) {
      params[`per_page`] = pageSize;
    }

    return params;
  }

  getSemuaPengguna() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    this.penggunaService.getAll(params).subscribe(
      (data: any) => {
        console.log(data);
        console.log(JSON.stringify(data));
        // console.log(JSON.stringify(data['Pengguna']['email']));
        this.pengguna = data.data;
        this.count = data.total;
        console.log("Pengguna");
        console.log(this.pengguna);
      },(error: any) => console.log(error)
    );
  }

  
  

  // Navigate
  tambahPengguna(){
    this.router.navigate(['/CreatePengguna']);
  };

  updatePengguna(id: any){
    this.router.navigate(['/UpdatePengguna/'+id]);
  }

  hapusPengguna(id: any){
    console.log("ID yang akan dihapus = " + id);
    this.penggunaService.hapusPengguna(id).subscribe(
      (data: any)  => {
        console.log(data);
        console.log(JSON.stringify(data));
        alert('Data dengan ID ' + id + " sudah dihapus");
      },(error: any) => console.log(error)
    );
  }

}










// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

// import { LoginModule, LoginFacebookModule } from "../../model/login/login.module";
// import { LoginService } from '../../service/login/login.service';
// declare var $: any;
// declare var anime: any; // declare like this
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   pengguna: LoginModule = new LoginModule();
//   penggunaFacebook: LoginFacebookModule = new LoginFacebookModule();
//   isLoggedIn = false;
//   socialUser: SocialUser;
//   // id localhost
//   // fbId      : '763875903994866';
//   // id web
//   fbId      : '266967207052951';
  
//   constructor(
//     private router: Router,
//     private loginService: LoginService,
//     private socialAuthService: SocialAuthService
//   ) { }
  
//   ngOnInit(): void {
//     this.fbLibrary();
//     this.pengguna.ingatSaya = 'Lupa';
    
//     if (this.isLoggedIn = true) {
//       if(localStorage.getItem('IDRole') == '"2"'){
//         console.log('BerandaAdmin');
//         this.router.navigate(['/BerandaAdmin']);
//       } else if(localStorage.getItem('IDRole') == '"3"'){
//         console.log('Beranda Umum');
//         this.router.navigate(['/Beranda']);
//       } 
//     }
    
//     this.socialAuthService.authState.subscribe((user) => {
//       this.socialUser = user;
//     });

//     // Wrap every letter in a span
//     const textWrapper = document.querySelector(".an-1");
//     textWrapper.innerHTML = textWrapper.textContent.replace(
//       /\S/g,
//       "<span class='letter'>$&</span>"
//     );

//     anime
//       .timeline({ loop: true })
//       .add({
//         targets: ".an-1 .letter",
//         scale: [4, 1],
//         opacity: [0, 1],
//         translateZ: 0,
//         easing: "easeOutExpo",
//         duration: 1500,
//         delay: (el, i) => 70 * i
//       })
//       .add({
//         targets: ".an-1",
//         opacity: 0,
//         duration: 1000,
//         easing: "easeOutExpo",
//         delay: 3000
//       });
//   }
  
//   onLogin() {
//     this.loginService.login(this.pengguna).subscribe(
//       data => {
//         // console.log(data);
//         // console.log(JSON.stringify(data['Pengguna']['email']));
//         this.pengguna = new LoginModule();
//         this.gotoList(data);
//         localStorage.setItem('provider', 'Blubuk');
//       },error => console.log(error)
//     );
//   }

//   onLoginFacebook() {
//     this.loginService.loginFacebook(this.penggunaFacebook).subscribe(
//       data => {
//         // console.log(data);
//         // console.log(JSON.stringify(data['Pengguna']['email']));
//         this.penggunaFacebook = new LoginFacebookModule();
//         this.gotoList(data);
//         localStorage.setItem('provider', 'Facebook');
//       },error => console.log(error)
//     );
//   }

//   gotoList(data) {
//     this.pasangSession(data);
//     // console.log(typeof(localStorage.getItem('IDRole')));
//     // console.log('ID Role = ' + localStorage.getItem('IDRole'));
//     if (localStorage.getItem('IDRole') == '"1"') {
//       // console.log('Belum Register');
//       this.router.navigate(['']);
//     } else if(localStorage.getItem('IDRole') == '"2"'){
//       this.isLoggedIn = true;
//       // console.log('BerandaAdmin');
//       this.router.navigate(['/BerandaAdmin']);
//     } else if(localStorage.getItem('IDRole') == '"3"'){
//       this.isLoggedIn = true;
//       // console.log('Beranda Umum');
//       this.router.navigate(['/Beranda']);
//     } else {
//       // console.log('Halaman Login');
//       this.router.navigate(['/Login']);
//     }
//     // alert("Hallo" + JSON.parse(data.email)); 
//     // this.router.navigate(['/list-mahasiswa']);
//   }
  
//   onCheckboxChange(e) {
//     if (e.target.checked) {
//       this.pengguna.ingatSaya = 'Ingat Saya';
//     } else {
//       this.pengguna.ingatSaya = 'Lupa';
//     }
//   }

//   pasangSession(data){
//     localStorage.setItem('isLoggedIn', 'True');
//     localStorage.setItem('Email', JSON.stringify(data['Pengguna']['email']));
//     localStorage.setItem('Username', JSON.stringify(data['Pengguna']['username']));
//     localStorage.setItem('Status', JSON.stringify(data['Pengguna']['status']));
//     localStorage.setItem('IDRole', JSON.stringify(data['Pengguna']['id_role']));
//     localStorage.setItem('FotoProfil', JSON.stringify(data['Pengguna']['foto_profil']));
//     localStorage.setItem('Token', JSON.stringify(data['Pengguna']['token']));
//     localStorage.setItem('OauthUID', JSON.stringify(data['Pengguna']['oauth_uid']));
//     localStorage.setItem('OauthProvider', JSON.stringify(data['Pengguna']['oauth_provider']));
//     localStorage.setItem('TanggalLahir', JSON.stringify(data['Pengguna']['tanggalLahir']));
//     localStorage.setItem('BulanLahir', JSON.stringify(data['Pengguna']['bulanLahir']));
//     localStorage.setItem('TahunLahir', JSON.stringify(data['Pengguna']['tahunLahir']));
//     localStorage.setItem('Agama', JSON.stringify(data['Pengguna']['agama']));
//     localStorage.setItem('Telpon', JSON.stringify(data['Pengguna']['telpon']));
//     localStorage.setItem('Ponsel', JSON.stringify(data['Pengguna']['ponsel']));
//     localStorage.setItem('Alamat', JSON.stringify(data['Pengguna']['alamat']));
//     localStorage.setItem('KodePos', JSON.stringify(data['Pengguna']['kodePos']));
//     localStorage.setItem('IDProvinsi', JSON.stringify(data['Pengguna']['idProvinsi']));
//     localStorage.setItem('Provinsi', JSON.stringify(data['Pengguna']['provinsi']));
//     localStorage.setItem('LogoProvinsi', JSON.stringify(data['Pengguna']['logoProvinsi']));
//     localStorage.setItem('IDKabupaten', JSON.stringify(data['Pengguna']['idKabupaten']));
//     localStorage.setItem('Kabupaten', JSON.stringify(data['Pengguna']['kabupaten']));
//     localStorage.setItem('LogoKabupaten', JSON.stringify(data['Pengguna']['logoKabupaten']));
//     localStorage.setItem('JenisKelamin', JSON.stringify(data['Pengguna']['jenisKelamin']));
//     localStorage.setItem('NamaPerusahaan', JSON.stringify(data['Pengguna']['namaPerusahaan']));
//   }

//   fbLibrary() {
//     window['fbAsyncInit'] = function () {
//       FB.init({
//         appId      : this.fbId,
//         cookie     : true,
//         status     : true,
//         xfbml      : true,
//         version    : 'v8.0'
//           });

//           // auto authenticate with the api if already logged in with facebook
//           FB.getLoginStatus(({authResponse}) => {
//               if (authResponse) {
//                 console.log("Access Token = " + authResponse.accessToken);
//               } else {
//                 console.log("Belum Login");
//               }
//           });
//         };

//     // load facebook sdk script
//     (function (d, s, id) {
//         var js, fjs = d.getElementsByTagName(s)[0];
//         if (d.getElementById(id)) { return; }
//         js = d.createElement(s); js.id = id;
//         js.src = "https://connect.facebook.net/en_US/sdk.js";
//         fjs.parentNode.insertBefore(js, fjs);
//     }(document, 'script', 'facebook-jssdk'));    
//   }

//   loginfacebook() { 
//     window['FB'].login((response) => {
//         console.log('login response',response);
//         if (response.authResponse) {
 
//           window['FB'].api('/me', {
//             fields: 'id, email, first_name, last_name',
//           }, (userInfo) => {
//             // console.log("user information");
//             // console.log(userInfo);
//             // console.log("Access Token = " + response.authResponse.accessToken);
//             // console.log("ID = " + userInfo['id']);
//             // console.log("Email = " + userInfo['email']);
//             // console.log("First Name = " + userInfo['first_name']);
//             // console.log("Last Name = " + userInfo['last_name']);
//             this.penggunaFacebook.id = userInfo['id'];
//             this.penggunaFacebook.email = userInfo['email'];
//             this.penggunaFacebook.first_name = userInfo['first_name'];
//             this.penggunaFacebook.last_name = userInfo['last_name'];
//             this.penggunaFacebook.access_token = response.authResponse.accessToken;
//             // console.log("Pengguna Facebook");
//             // console.log(this.penggunaFacebook);
//             this.onLoginFacebook();
//           });
           
//         } else {
//           console.log('User login failed');
//         }
//     }, {scope: 'email'});
//   }
  

    

// }




