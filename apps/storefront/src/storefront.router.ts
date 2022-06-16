import { RouteConfig, Router } from '@lit-labs/router';
import { PatchableLitElement, SSRAwaiterService } from '@spryker-oryx/core';
import { RouterService } from '@spryker-oryx/experience';
import { resolve } from '@spryker-oryx/injector';
import { isClient } from '@spryker-oryx/typescript-utils';
import { html, ReactiveControllerHost } from 'lit';
import { tap } from 'rxjs';

export class StorefrontRouter extends Router {
  protected id: string;
  protected routerService = resolve(this, RouterService);
  protected ssrAwaiter = resolve(this, SSRAwaiterService, null);
  protected ssrRendered = false;
  // TODO - @lit-labs/router does not expose _host. If they do, we will prefer it over this.
  protected readonly host: ReactiveControllerHost & HTMLElement;
  // window.location.pathname alternative to private _currentRoute is updated too early
  protected currentPath: string;

  constructor(
    host: ReactiveControllerHost & HTMLElement,
    routes: Array<RouteConfig>
  ) {
    super(host, routes);
    this.host = host;
    this.ssrRendered = !!(isClient() && host.shadowRoot);

    this.routerService
      .currentRoute()
      .pipe(
        tap(async (route: string) => {
          if (route && route !== '') {
            const resolve = this.ssrAwaiter?.getAwaiter();
            await this._goto(route);
            this.routerService.acceptParams(this.params);
            resolve?.();
          }
        })
      )
      .subscribe();

    if (!this.ssrRendered) {
      this.routerService.go(window.location.pathname);
    }
  }

  async _goto(pathname: string): Promise<void> {
    this.currentPath = window.location?.pathname;
    // As part of the lazy hydration strategy, everything should not be hydrated by default
    // If the host component is SSR rendered, hydrating it wipes everything
    // So none of the previously SSRed sub components will remain
    // This should only happen when someone actually clicks on a link; not during page load
    if (
      this.ssrRendered &&
      (this.host as unknown as PatchableLitElement)._$needsHydration
    ) {
      return;
    }

    await super.goto(pathname);
  }

  override async goto(pathname: string): Promise<void> {
    const oldPath = this.currentPath;
    const oldParams = JSON.stringify(this.params);
    await this._goto(pathname);
    if (
      (oldPath && oldPath !== this.currentPath) ||
      JSON.stringify(this.params) !== oldParams
    ) {
      this.routerService.go(pathname);
    }
  }

  override outlet() {
    const result = html`<outlet>${super.outlet()}</outlet>`;
    return result;
  }
}