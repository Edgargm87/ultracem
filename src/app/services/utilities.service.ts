import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  server: string = environment.urlApi;
  notoken: string = 'notoken';


  constructor(private _httpClient: HttpClient, private router: Router,) { }

  //Funciones de sesion
  readToken() {
    let token: any;
    if (this.validateToken()) {
      return token = localStorage.getItem('accessToken');
    } else {
      return token = ''
    }
  }
  validateToken(): boolean {
    if (localStorage.getItem('accessToken')) {
      return true;
    } else {
      return false;
    }
  }

  getSession(param: string) {
    return localStorage.getItem(param);
  }


  // funciones de peticiones puras
  getQuery(query: string, sendHeaders: boolean) {
    const URL = this.server + query;
    const headers = new HttpHeaders({
      'Authentication': `${this.readToken()}`,
      'Content-Type': 'application/json; charset=utf-8'
    });
    if (sendHeaders) {
      return this._httpClient.get(URL, { headers }).pipe(catchError(this.handleError));
    }
    else {
      return this._httpClient.get(URL).pipe(catchError(this.handleError));
    }
  }

  getFile(query: string) {
    const URL = this.server + query;
    const headers = new HttpHeaders({
      'Authentication': `${this.readToken()}`,
      'Content-Type': 'application/json; charset=utf-8',
      'responseType': 'blob'
    });
    return this._httpClient.get(URL, { headers }).pipe(catchError(this.handleError));

  }

  deleteQuery(query: string, sendHeaders: boolean) {
    const URL = this.server + query;
    const headers = new HttpHeaders({
      'Authentication': `${this.readToken()}`,
      'Content-Type': 'application/json; charset=utf-8'
    });
    if (sendHeaders) {
      return this._httpClient.delete(URL, { headers }).pipe(catchError(this.handleError));
    }
    else {
      return this._httpClient.delete(URL).pipe(catchError(this.handleError));
    }
  }

  postQuery(query: string, data: any, typeHeaders: string = 'data') {
    const URL = this.server + query;
    let optiones: any;
    if (typeHeaders == 'data') {
      optiones = {
        'Authentication': `${this.readToken()}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      };
    } else {
      if (typeHeaders == this.notoken) {

        optiones = {
          'Authentication': ``,
          "Accept": "application/json, text/plain, */*",
          'Content-Type': 'application/json; charset=utf-8'
        }
      } else {
        optiones = {
          'Authentication': `${this.readToken()}`,
          "Accept": "application/json",
        }
      }
    }

    const headers = new HttpHeaders(optiones);
    headers.delete('Content-Type');
    return this._httpClient.post(URL, data, { headers }).pipe(catchError(this.handleError));
  }





  putQuery(server:string, query: string, data: any, typeHeaders: string = 'data') {
    
    
    const URL =server + query;
    let optiones: any;
    if (typeHeaders == 'data') {
      optiones = {
        'Authentication': `${this.readToken()}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      };
    } else {
      if (typeHeaders == this.notoken) {
        optiones = {
          "Accept": "application/json",
          'Content-Type': 'application/json; charset=utf-8'
        }
      } else {
        optiones = {
          'Authentication': `${this.readToken()}`,
          "Accept": "application/json",
        }
      }
    }
    const headers = new HttpHeaders(optiones);
    return this._httpClient.put(URL, data, { headers }).pipe(catchError(this.handleError));
  }



  //Funcion para el Manejo de errores
  handleError = (err: any): Observable<HttpEvent<any>> => {
    // debugger;
    let errorMessage = 'No hay respuesta, favor intente nuevamente';
    let icon: string = 'question';
    console.log("Algo se daño");
    let res: any = {}
    if (err.error instanceof ErrorEvent) {
      icon = "question";
      errorMessage = `Error: ${err.error.msg}`;
    } else {
      switch (err.status) {
        case 401:
          localStorage.clear();
          localStorage.clear();
          setTimeout(() => {
            Swal.fire({
              title: 'Error',
              text: "Datos de acceso incorrecto, favor volver iniciar sesión",
              icon: 'error',
              confirmButtonText: 'Cerrar'
            })
            localStorage.setItem('closeSession', 'true');
            this.router.navigateByUrl("/login");
          }, 100);
          break;
        case 402:
          // localStorage.clear();
          localStorage.clear();
          setTimeout(() => {
            localStorage.setItem('closeSession', 'true');
          }, 100);
          break;
        case 403:
          errorMessage = `No tiene permiso para ejecutar esta acción`;
          break;
        case 400:
          if (err.error.msg == 'La session ha expirado') {
            localStorage.clear();
            localStorage.clear();
            setTimeout(() => {
              localStorage.setItem('closeSession', 'true');

            }, 100);
          }
          if (err.error.msg !== undefined && typeof err.error.msg == 'string') {
            errorMessage = `${err.error.msg}`;
          }
          break;
        case 404:
          errorMessage = `${err.error.msg}`
          break;
        case 500:
          errorMessage = `${err.error.msg}`;
          break;
        default:
          errorMessage = `${err.statusText.msg}`;
          break;
      }
    }
    if (err.status !== 401 && err.error !== 'La session ha expirado') {


      if ((errorMessage != "undefined") && (errorMessage !== undefined) && (errorMessage != null) && (errorMessage != "") && (errorMessage != "UNKNOWN ERROR!")) {
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Cerrar'
        })

      } else {
        // Swal.fire({
        //   title: 'Error',
        //   text: "No hubo respuesta por parte del servidor, favor intente nuevamente",
        //   icon: 'error',
        //   confirmButtonText: 'Cerrar'
        // })
        this.router.navigateByUrl("/error");
      }
    }
    return throwError(errorMessage);
  }
  //Funcion para el Manejo de errores



}
