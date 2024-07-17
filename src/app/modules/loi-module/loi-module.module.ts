import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoiModuleComponent } from './loi-module.component';
import { LoiModuleRoutes } from './loi-module.routing';
import { WidgetComponentsModule } from '../../shared/spinner-widget-component/spinner-widget-components.module';
import { SharedModule } from '../../shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { loaderInterceptor } from '../loader.interceptor';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    LoiModuleRoutes,
    // BrowserModule,
    HttpClientModule
  ],
  declarations: [LoiModuleComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: loaderInterceptor,
      multi: true
  },
],
})
export class LoiModuleModule { }
