import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UtilityService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  server: string = environment.urlApi;
  public seleccionDireccion: Subject<{ valor: any }> = new Subject<{valor: any}>();
  constructor(private _utility: UtilityService) { }


  posData(url: string, data: any): Observable<any> {
    return this._utility.postQuery(url, data)
    .pipe(map((result: any) => {
      return result;
    }));
  }

  getData(url: string){
    return this._utility.getQuery(url, true)
      .pipe(map((res: any) => {
        return res.data;
      }));
  }

  saveReconocerID(data: any){
    return this._utility.putQuery(environment.apiCredit, '/webresources/form/save_reconocer', data)
      .pipe(map((res: any) => {
        return res.data;
      }));
      // return this.http.put('/webresources/form/save_reconocer', data)
  }

  formatearNumero(value:any){
    let valor=value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
    return valor;
  }
  enviarNumero(value:string){
    let valor=value.replace(/,/g, '');
    return valor;
  }

  getAplicaValidacionIdentidad() {
    return this._utility.posQueryServer(environment.apiCredit, '/webresources/firma/aplica-reconocer','{"unidad":"ULTRACEM"}').pipe(map((result: any) => {
      return result;
    }));
  }
}
