import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { PenggunaModule } from "../model/pengguna.module";
import { PenggunaService } from '../service/pengguna.service';
@Component({
  selector: 'app-update-pengguna',
  templateUrl: './update-pengguna.component.html',
  styleUrls: ['./update-pengguna.component.css']
})
export class UpdatePenggunaComponent implements OnInit {
  id: any;
  private sub: any;
  pengguna: PenggunaModule = new PenggunaModule();
  alertValidasi: string = '';
  emailRegex = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  formPengguna = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.pattern(this.emailRegex)]),
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      avatar: new FormControl('')
  });

  //validasi button
  buttonSave = false;
  buttonEmail = true;
  buttonNama = true;
  buttonAvatar = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private penggunaService: PenggunaService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
   console.log("ID = " + this.id);
   console.log("Sub = " + this.sub);
   this.getDaftarPenggunaById(this.id);
  }

  // validasi

  validasiEmail(){
    console.log('Validasi Email');
    console.log(this.pengguna.email);
    console.log(this.formPengguna.get('email')?.status);
    if(this.pengguna.email == undefined || this.pengguna.email == '' || this.pengguna.email == null){
      this.alertValidasi = "\n\rHarap isi email anda";
      this.buttonEmail = false;
    }else{
      if(this.formPengguna.get('email')?.status == 'INVALID'){
        this.alertValidasi = "\n\rHarap isi email anda menggunakan format email";
        this.buttonEmail = false;
      }else{
        this.alertValidasi = "";
        this.buttonEmail = true;
      }
    }
  }
  
  validasiNama(){
    // console.log('Validasi Nama');
    // console.log('firstname');
    // console.log(this.pengguna.first_name);
    // console.log('last_name');
    // console.log(this.pengguna.last_name);
    if(this.pengguna.first_name == undefined || this.pengguna.first_name == '' || this.pengguna.first_name == 'null'){
      this.alertValidasi = this.alertValidasi + "\n\rHarap isi nama depan anda";
      this.buttonNama = false;
    } else if(this.pengguna.last_name == undefined || this.pengguna.last_name == '' || this.pengguna.last_name == 'null'){
      this.alertValidasi = this.alertValidasi + "\n\rHarap isi nama belakang anda";
      this.buttonNama = false;
    }else{
      this.buttonNama = true;
    }
  }

  validasiAvatar(){
    // console.log("Validasi Avatar");
    // console.log(this.pengguna.avatar);
    if(this.pengguna.avatar == undefined || this.pengguna.avatar == '' || this.pengguna.avatar == 'null'){
      this.alertValidasi = this.alertValidasi + "\n\rHarap isi avatar anda";
      this.buttonAvatar = false;
    }else{
      console.log(this.pengguna.avatar.length);
      if(this.pengguna.avatar.length > 9){
        if(this.pengguna.avatar.length < 49){
          this.buttonAvatar = true;
        }else{
          this.alertValidasi = this.alertValidasi + "\n\rHarap isi avatar anda maksimal 50 karakter";
          this.buttonAvatar = false;
        }
      }else{
        this.alertValidasi = this.alertValidasi + "\n\rHarap isi avatar anda minimal 10 karakter";
        this.buttonAvatar = false;
      }
    }
  }

  getDaftarPenggunaById(id: any){
    console.log("ID yang akan diupdate = " + id);
    this.penggunaService.getDaftarPenggunaById(id).subscribe(
      (data: any) => {
        console.log("Get Pengguna By ID");
        console.log("data");
        console.log(data);
        console.log("json");
        console.log(JSON.stringify(data));
        // console.log(JSON.stringify(data['Pengguna']['email']));
        this.pengguna = data.data;
        console.log("Pengguna");
        console.log(this.pengguna);
      },(error: any) => console.log(error)
    );
  }

  onUpdatePengguna() {
    console.log("On Update Pengguna");
    console.log(this.pengguna);
    this.penggunaService.updatePengguna(this.pengguna.id, this.pengguna).subscribe(
      (      data: any) => {
         console.log(data);
         // console.log(JSON.stringify(data['Pengguna']['email']));

         this.router.navigate(['/Pengguna']);
      }
    );
    console.log('ok');
  }

  periksaAlert(event: any): void{
    console.log("Periksa alert");
    this.validasiEmail();
    this.validasiNama();
    this.validasiAvatar();
    
    console.log('this.buttonEmail = ' + this.buttonEmail);
    console.log('this.buttonNama = ' + this.buttonNama);
    console.log('this.buttonAvatar = ' + this.buttonAvatar);
    if(this.buttonEmail == true && this.buttonNama == true && this.buttonAvatar == true){
      this.buttonSave = false;
    }else{
      this.buttonSave = true;
    }
    console.log('this.buttonSave = ' + this.buttonSave);
  }

  cancel() {
    this.router.navigate(['/Pengguna']);
  }

}
