import { StorageService, StorageType } from '@spryker-oryx/core';
import { inject } from '@spryker-oryx/di';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  ReplaySubject,
  Subject,
  withLatestFrom,
} from 'rxjs';
import { filter, take } from 'rxjs/operators';
import {
  NavigationExtras,
  RouteParams,
  RouterEvent,
  RouterEventType,
  RouterService,
} from './router.service';

const CURRENT_PAGE = 'currentPage';
const PREVIOUS_PAGE = 'previousPage';

export class DefaultRouterService implements RouterService {
  private router$ = new BehaviorSubject(globalThis.location?.pathname ?? '/');
  private params$ = new ReplaySubject<RouteParams>(1);
  private urlSearchParams$ = new BehaviorSubject<RouteParams>(
    this.getURLSearchParams()
  );
  private routerEvents$: Subject<RouterEvent> = new Subject();
  private storedRoute$ = new BehaviorSubject('');

  protected storageService = inject(StorageService);

  go(route: string, extras?: NavigationExtras): void {
    if (
      this.router$.value === route &&
      JSON.stringify(this.urlSearchParams$.value) ===
        JSON.stringify(extras?.queryParams ?? {})
    ) {
      return;
    }

    this.router$.next(route);
    this.urlSearchParams$.next(
      extras?.queryParams ?? this.getURLSearchParams() ?? {}
    );
    this.routerEvents$.next({ route, type: RouterEventType.NavigationEnd });
  }

  navigate(route: string): void {
    globalThis.history.pushState({}, '', route);
    this.go(route);
  }

  back(): void {
    globalThis.history.back();
  }

  getEvents(type: RouterEventType): Observable<RouterEvent> {
    return this.routerEvents$.pipe(filter((event) => event.type === type));
  }

  previousRoute(): Observable<string | null> {
    return this.storageService.get<string>(PREVIOUS_PAGE, StorageType.SESSION);
  }

  currentRoute(): Observable<string> {
    return this.router$.pipe(
      withLatestFrom(this.storedRoute$),
      map(([route, currentPage]) => {
        if (currentPage) {
          this.storageService.set(
            PREVIOUS_PAGE,
            currentPage,
            StorageType.SESSION
          );
        }
        this.storeRoute(route);
        return route;
      })
    );
  }

  currentParams(): Observable<RouteParams> {
    return this.params$;
  }

  acceptParams(params: RouteParams): void {
    this.params$.next(params);
  }

  currentQuery(): Observable<RouteParams | undefined> {
    return this.urlSearchParams$.asObservable();
  }

  getUrl(route?: string, extras?: NavigationExtras): Observable<string> {
    return combineLatest([this.currentRoute(), this.currentQuery()]).pipe(
      take(1),
      map(([activeRoute, activeQueryParams]) => {
        const parsedParams = this.createUrlParams(
          extras?.queryParamsHandling === 'merge'
            ? { ...activeQueryParams, ...(extras.queryParams ?? {}) }
            : extras?.queryParams
        );

        return `${(route || activeRoute).split('?')[0]}${
          parsedParams ? `?${parsedParams}` : ''
        }`;
      })
    );
  }

  protected createUrlParams(params?: {
    [x: string]: string | string[] | undefined;
  }): string | undefined {
    if (!params) {
      return;
    }

    return Object.entries(params).reduce((params, [k, v]) => {
      const encodedValue = Array.isArray(v)
        ? v.map((val) => encodeURIComponent(val)).join(',')
        : encodeURIComponent(v ?? '');

      return encodedValue ? `${params}&${k}=${encodedValue}` : params;
    }, '');
  }

  protected storeRoute(value: string): void {
    this.storageService.set(CURRENT_PAGE, value, StorageType.SESSION);
    this.storedRoute$.next(value);
  }

  protected getURLSearchParams(): { [k: string]: string } {
    return Object.fromEntries(
      new URLSearchParams(
        decodeURIComponent(globalThis.location?.search ?? '')
      ).entries()
    );
  }
}