import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import {catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://node-js-my-sql-api.vercel.app';
  private token = localStorage.getItem('token');
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Blubuk-API': 'www.blubuk.com',
      'Authorization': localStorage.getItem('token') || '{}',
      // 'Authorization': JSON.parse(localStorage.getItem('sessionObject')),
    })
  };
  
  
  constructor(private http: HttpClient) { }
  
  getAll(params: any): Observable<any> {
    // return this.http.get<any>('https://node-js-my-sql-api.vercel.app/crud/product/?offset=1&limit=3', this.httpOptions)
    return this.http.get<any>(this.baseUrl + '/crud/product/' , { params, headers: this.httpOptions['headers'] } );
  }


  getDaftarPengguna(pages: string | number) {
    return this.http.get(this.baseUrl + '?page=' + pages);
  }
  
  getAllAwal(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl, { params });
  }

  getDaftarPenggunaById(id: any) {
    return this.http.get(this.baseUrl + '/' + id);
  }

  createPenggunaBaru(pengguna: Object): Observable<Object>  {
    console.log('service createPenggunaBaru');
    console.log(pengguna);
    console.log("haha");
    return this.http.post<Object>(this.baseUrl, pengguna, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', pengguna))
      );
  }

  updatePengguna(id: any, value: any): Observable<Object> {
    // return this.http.put('${this.baseUrl}/mahasiswa/${id}', value);
    return this.http.put(this.baseUrl + '/' + id, value);
  }

  hapusPengguna(id: any) {
    return this.http.delete(this.baseUrl + '/' + id, { responseType: 'text' });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
 
}
