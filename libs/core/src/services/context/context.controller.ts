import { resolve } from '@spryker-oryx/injector';
import { ReactiveController, ReactiveControllerHost } from 'lit';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  EMPTY,
  map,
  Observable,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { ContextService } from './context.service';

export class ContextController implements ReactiveController {
  protected context = resolve(this, ContextService, null);
  protected triggerContext$ = new BehaviorSubject<void | null>(null);

  constructor(protected host: ReactiveControllerHost & Element) {
    (this.host = host).addController(this);
  }

  get<T>(
    key: string,
    overrideContext$: Observable<T | undefined> = EMPTY
  ): Observable<T | undefined> {
    return combineLatest([
      overrideContext$.pipe(startWith(undefined)),
      this.triggerContext$.pipe(
        switchMap(
          (): Observable<T | undefined> =>
            this.context?.get(this.host, key) ?? of(undefined)
        )
      ),
    ]).pipe(
      map(([overrideContext, context]) => overrideContext ?? context),
      distinctUntilChanged()
    );
  }

  provide(key: string, value: unknown): void {
    this.context?.provide(this.host, key, value);
  }

  remove(key: string): void {
    this.context?.remove(this.host, key);
  }

  hostConnected(): void {
    this.triggerContext$.next();
  }
}
