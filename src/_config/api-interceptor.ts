import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SocketIoService } from 'app/services/socket-io.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private injector: Injector, private router: Router) {}

    /**
     * Se agrega en automatico a cada HttpRequest, ver appmodules
     * @param request peticion de http client
     * @param next envia el request modificado
     */
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        console.log(request.urlWithParams);
        console.log(request.url);
        console.log(request.method);
        // this.injector.get(SocketIoService).emitEventOnInterceptor(,request.method)
        return next.handle(request);
        // Errores de API
        // .pipe(
        //     catchError(err => {
        //         localStorage.removeItem('userKey');
        //         this.router.navigate(['login']);
        //         return throwError(err);
        //     }),
        //     map((event: any) => {
        //         if (
        //             event.body &&
        //             event.body.error === 'Token expirado'
        //         ) {
        //             localStorage.removeItem('userKey');
        //             this.router.navigate(['login']);
        //         }
        //         return event;
        //     })
        // )
    }
}
