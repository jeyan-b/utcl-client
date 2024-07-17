import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent
} from "@angular/common/http";
// import { LoaderService } from "./loader.service";
import { tap } from "rxjs/operators";
import { GlobalSharedService } from "../core/services/global-shared.service";
// import { Observable } from 'rxjs/Observable';
@Injectable()
export class loaderInterceptor implements HttpInterceptor {

  constructor(
    private globalSharedSrv: GlobalSharedService
  ) {
    
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // this._loaderService.ShowLoader();
    console.log('from interceptor loading...')
    this.globalSharedSrv.isSpinnerActive.next(true);
    return next.handle(request).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // this.spinnerService.hide();
            console.log('from interceptor succ')
    this.globalSharedSrv.isSpinnerActive.next(false);

          }
        }, 
        error: (error) => {
          // this.spinnerService.hide();
          console.log('from interceptor err')
    this.globalSharedSrv.isSpinnerActive.next(false);

        }
      }
        // req => {
        //   if (req instanceof HttpResponse) {
        //     // this._loaderService.HideLoader();
        //     console.log('from interceptor succ')
        //   }
        // },
        // err => {
        //   // this._loaderService.HideLoader();
        //   console.log('from interceptor err')

        // }
      )
    );
  }
};
function complete(arg0: (req: any) => void, arg1: (err: any) => void): import("rxjs").OperatorFunction<import("@angular/common/http").HttpEvent<any>, unknown> {
  throw new Error("Function not implemented.");
}

