import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { MainErrorNotifierService } from '../services/main-error-notifier.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

    constructor(private readonly mainErrorNotifierService: MainErrorNotifierService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.log(error)
                    let errorMsg = '';                    
                    if (error.error instanceof ErrorEvent) {
                        console.log('This is client side error');
                        errorMsg = `Error: ${error.error.message}`;
                    } else {
                        console.log('This is server side error');
                        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                    }
                    console.error(errorMsg);
                    this.mainErrorNotifierService.setMainErrorMessage(errorMsg);
                    return throwError(errorMsg);
                })
            )
    }
}