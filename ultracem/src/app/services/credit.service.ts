import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

export interface listaGenerica {
  codigoOpcion: string,
  descripcionOpcion: string
}

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  infoApp = environment;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private _http: HttpClient) { }
  /**
   * Regresa 'SI' y 'NO'
   * @returns Observable
   */
  getClienteUltracem(): Observable<any> {
    return this._http.get(this.infoApp.urlApi + 'generic/qry/consulta-lista-generica/cliente-ultracem', { 'headers': this.headers }).pipe(map(res => res));
  }

  /**
   * Regresa los tipos de genero
   * @returns retorna un observable con los disferente tipos de genero
   */
  getGeneros(): Observable<any> {
    return this._http.get(this.infoApp.urlApi + 'generic/qry/consulta-lista-generica/genero', { 'headers': this.headers }).pipe(map(res => res));
  }

  /**
   * Obtiene los diferentes tipos de documentos
   * @returns Observable
   */
  getTipoDocumento(): Observable<any> {
    return this._http.get(this.infoApp.urlApi + 'generic/qry/consulta-lista-generica/tipo-documento', { 'headers': this.headers }).pipe(map(res => res));
  }

  /**
   * regresa los ditos de registro en ultracem
   * @returns Observable
   */
  getTipoRegistro(): Observable<any> {
    return this._http.get(this.infoApp.urlApi + 'generic/qry/consulta-lista-generica/tipo-cliente', { 'headers': this.headers }).pipe(map(res => res));
  }

  getDocuments(tipoDocumento: string, nSolicitud: number): Observable<any> {
    return this._http.get(this.infoApp.urlApi + 'generic/qry/documentos-reque/32/' + nSolicitud + '/' + tipoDocumento, { 'headers': this.headers }).pipe(map(res => res));
  }

  getDocumentsTypes(): Observable<any> {
    return this._http.get(this.infoApp.urlApi+ 'generic/qry/consulta-lista-generica/TIP-DOC-REP', { 'headers': this.headers }).pipe(map(res => res))
  }

  /**
   * Servicio POST para iniciar sesión y obtener token
   * @returns Retorna un observable que devuelve el token
   */
  login(): Observable<any> {
    return this._http.post(this.infoApp.urlApi + 'private/iniciar-sesion', { userName: this.infoApp.userName, password: this.infoApp.password }).pipe(map(res => res));
  }
  /**
   * Servicio POST nos devuelve la información del cliente en caso de estar en la base de datos de ultracem
   * @param form recibe el documento y tipo de documento
   * @returns Observable con la información del cliente en caso de que exista
   */
  preaprobado(form: any): Observable<any> {
    let body = {
      tipoDocumento: form.tipoDocumento,
      documento: form.documento.toString()
    }
    return this._http.post(this.infoApp.urlApi + 'generic/formulario-solicitud-preaprobado', body).pipe(map(res => res));
  }

  /**
   * Servicio POST devuelve el numero se la solicitud
   * @param form Formulario con los datos de los tipos de persona: juridica y natural
   * @returns un observable
   */
  solicitudUltracem(form: any): Observable<any> {
    return this._http.post(this.infoApp.urlApi + 'credito/formulario-solicitud-ultracem', form).pipe(map(res => res));
  }

  solicitudes(url: string): Observable<any> {
    return this._http.get(this.infoApp.urlApi + url).pipe(map(res => res));
  }
}
