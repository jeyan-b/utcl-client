import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { error } from 'console';
import { ErrorHandlerService } from '../../../shared/services/ErrorHandler.service';
import { LoiServiceUrls } from '../../../core/constants/service-url-constants';

@Injectable({
  providedIn: 'root',
})
export class LoiService {
  constructor(
    private http: HttpClient,
    private errorHandlerSvc: ErrorHandlerService
  ) {}


  private _postAgency(): string {
    return LoiServiceUrls.postAgencyTokens;
  }

  private _postAgreement(): string {
    return LoiServiceUrls.postAgreementTokens;
  }

  private _postCcnfCommision(): string {
    return LoiServiceUrls.postCcnfCommisionTokens;
  }

  private _postDoDSales(): string {
    return LoiServiceUrls.postDodSalesTokens;
  }

  private _postGkr(): string {
    return LoiServiceUrls.postGkrTokens;
  }

  private _postOtherExpenser(): string {
    return LoiServiceUrls.postOtherExpenseTokens;
  }
  
  postAgency(payload) {
    let _url = this._postAgency();
    return this.http
      .post(_url, payload)
      .pipe(catchError((error) => this.errorHandlerSvc.handleError(error)));
  }

  postAgreement(payload) {
    let _url = this._postAgreement();
    return this.http
      .post(_url, payload)
      .pipe(catchError((error) => this.errorHandlerSvc.handleError(error)));
  }
  
  postCcnfCommision(payload) {
    let _url = this._postCcnfCommision();
    return this.http
      .post(_url, payload)
      .pipe(catchError((error) => this.errorHandlerSvc.handleError(error)));
  }

  postDoDSales(payload) {
    let _url = this._postDoDSales();
    return this.http
      .post(_url, payload)
      .pipe(catchError((error) => this.errorHandlerSvc.handleError(error)));
  }

  postGkr(payload) {
    let _url = this._postGkr();
    return this.http
      .post(_url, payload)
      .pipe(catchError((error) => this.errorHandlerSvc.handleError(error)));
  }

  postOtherExpense(payload) {
    let _url = this._postOtherExpenser();
    return this.http
      .post(_url, payload)
      .pipe(catchError((error) => this.errorHandlerSvc.handleError(error)));
  }
}
