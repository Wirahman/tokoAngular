import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PenggunaComponent } from "./pengguna/pengguna.component";
import { CreatePenggunaComponent } from "./pengguna/create-pengguna/create-pengguna.component";
import { UpdatePenggunaComponent } from "./pengguna/update-pengguna/update-pengguna.component";
import { LoginComponent } from "./login/login.component";
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Pengguna', component: PenggunaComponent },
  { path: 'CreatePengguna', component: CreatePenggunaComponent },
  { path: 'UpdatePengguna/:id', component: UpdatePenggunaComponent },
  { path: 'Product', component: ProductComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }