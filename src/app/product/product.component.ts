import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductModule } from './model/product.module';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: any = [];
  currentIndex = -1;
  pages: 1 = 1;
  title = '';
  page = 1;
  count = 0;
  pageSize = 3;
  
  constructor(
    private router: Router,
    private ProductService: ProductService,
  ) { }


  ngOnInit(): void {
    this.getSemuaProduct();
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getSemuaProduct();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`offset`] = page;
    }

    if (pageSize) {
      params[`limit`] = pageSize;
    }

    return params;
  }

  getSemuaProduct() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    this.ProductService.getAll(params).subscribe(
      (data: any) => {
        console.log(data);
        console.log(JSON.stringify(data));
        // console.log(JSON.stringify(data['data']['productName']));
        this.product = data.data;
        this.count = data.total;
        console.log("Product");
        console.log(this.product);
      },(error: any) => console.log(error)
    );
  }

  // Navigate
  tambahProduct(){

  }
  
  // tambahPengguna(){
  //   this.router.navigate(['/CreatePengguna']);
  // };

  updateProduct(id: any){

  }
  
  // updatePengguna(id: any){
  //   this.router.navigate(['/UpdatePengguna/'+id]);
  // }

  hapusProduct(id: any){

  }


  // hapusPengguna(id: any){
  //   console.log("ID yang akan dihapus = " + id);
  //   this.penggunaService.hapusPengguna(id).subscribe(
  //     (data: any)  => {
  //       console.log(data);
  //       console.log(JSON.stringify(data));
  //       alert('Data dengan ID ' + id + " sudah dihapus");
  //     },(error: any) => console.log(error)
  //   );
  // }

  






}
