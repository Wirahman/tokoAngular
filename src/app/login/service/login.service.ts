import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import {catchError, retry, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'https://node-js-my-sql-api.vercel.app/';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Blubuk-API': 'www.blubuk.com'
    })
  };
  
  constructor(private http: HttpClient) { }

  onLogin(penggunaLogin: Object): Observable<Object> {
    // console.log('service createPenggunaBaru');
    // console.log(penggunaLogin);

    // tangkap status headernya dlu apakah 200 atau 400 baru ambil pesannya.
    return this.http.post<Object>(this.baseUrl + 'auth/admin', penggunaLogin)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', penggunaLogin))
      );

  }

  //Contoh Api yang pernah dibuat
  getDaftarPengguna(pages: string | number) {
    return this.http.get(this.baseUrl + '?page=' + pages);
  }
  
  getAll(params: any): Observable<any> {
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









