import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { GlobalSharedService } from '../services/global-shared.service';
import { catchError, finalize, Observable, retry, throwError } from 'rxjs';
import { request } from 'http';

export const httpConfigurationInterceptorInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  let httpsReq: any;
  console.log('req.url.indexOf("https:") ', req.url.indexOf('https:')+' req.url ', req.url);
  if (
    req.url.indexOf('https:') === -1 &&
    req.url.indexOf('http:') === -1 &&
    req.url.indexOf('assets') === -1 &&
    req.url !== 'user/login' && req.url !== 'user/refreshToken'
  ) {
    httpsReq = req.clone({
      url: GlobalSharedService.APIURL + req.url,
      setHeaders: {
        Authorization: `Bearer ${GlobalSharedService.ACCESSTOKEN}`,
      },
    });
  } else if (
    req.url.indexOf('https:') === -1 &&
    req.url.indexOf('http:') === -1 &&
    req.url.indexOf('assets') === -1
  ) {
    httpsReq = req.clone({
      url: GlobalSharedService.APIURL + req.url,
    });
  } else {
    httpsReq = req;
  }
  return next(httpsReq);
  // return next(httpsReq).pipe(

  //   catchError((err: any) => {
  //     console.log('error from interceptor')
  //     if (err instanceof HttpErrorResponse) {
  //       // Handle HTTP errors
  //       if (err.status === 401) {
  //         // Specific handling for unauthorized errors         
  //         console.error('Unauthorized request:', err);
  //         // You might trigger a re-authentication flow or redirect the user here
  //       } else {
  //         // Handle other HTTP error codes
  //         console.error('HTTP error:', err);
  //       }
  //     } else {
  //       // Handle non-HTTP errors
  //       console.error('An error occurred:', err);
  //     }

  //     // Re-throw the error to propagate it further
  //     return throwError(() => err); 
  //   }  
  //   );
  
    
  // );
  // return next.handle(req).pipe(finalize(() => loadingService.hide()));
  // return next.handle(httpsReq)
  //     .map((event: HttpEvent<any>) => {
  //       if (event instanceof HttpResponse && ~~(event.status / 100) > 3) {
  //         console.info('HttpResponse::event =', event, ';');
  //       } else console.info('event =', event, ';');
  //       return event;
  //     })
  //     .catch((err: any, caught) => {
  //       if (err instanceof HttpErrorResponse) {
  //         if (err.status === 403) {
  //           console.info('err.error =', err.error, ';');
  //         }
  //         return Observable.throw(err);
  //       }
  //     });

};
