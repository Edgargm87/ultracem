import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UtilityService } from './utilities.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authenticated: boolean = false;

  server: string = environment.urlApi;
  constructor( private _httpClient: HttpClient, private _utilityService: UtilityService) { }


  postSession(user: string, pass: string) {
    let query: string = `private/portal/iniciar-sesion`;
    let data = {
      "userName": user,
      "password": btoa(pass)
    }
    return this._utilityService.postQuery(query, data, 'notoken')
      .pipe(map((res: any) => {
        this.saveSession(res.data);
        return true;
      }));
  }



  saveSession(res: any = {}) {

    localStorage.setItem('accessToken', res.token);
    localStorage.setItem('infoauth', JSON.stringify(res));

    // Store the access token in the local storage
    this.accessToken = res.token;

    // Set the authenticated flag to true
    this._authenticated = true;

    // Return a new observable with the response
    return of(res);
  }
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }


}
