import { Observable } from 'rxjs';
import { RequestOptions } from '../http.model';

export const HttpInterceptor = 'FES.HttpInterceptor*';
export const HttpHandler = 'FES.HttpHandler';

export type HttpHandlerFn = (
  url: string,
  options: RequestOptions
) => Observable<Response>;

export interface HttpHandler {
  handle: HttpHandlerFn;
}

export interface HttpInterceptor {
  intercept(
    url: string,
    options: RequestOptions,
    handle: HttpHandlerFn
  ): Observable<Response>;
}

declare global {
  interface InjectionTokensContractMap {
    [HttpInterceptor]: HttpInterceptor[];
    [HttpHandler]: HttpHandler;
  }
}