import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth header from your auth service.
        const token = localStorage.getItem('TOKEN');

        //
        const clonedReq = this.addToken(req, token);
        return next.handle(clonedReq).pipe();
    }

    // Adds the token to your headers if it exists
    private addToken(request: HttpRequest<any>, token: any) {
        if (token) {
          console.log('INTERCEPTOR');
            let clone: HttpRequest<any>;
            clone = request.clone({
                setHeaders: {
                    Authentication: `${token}`
                }
            });
            return clone;
        }
        return request;
    }
}
