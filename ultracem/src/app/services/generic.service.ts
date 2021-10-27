import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilityService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

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
}
