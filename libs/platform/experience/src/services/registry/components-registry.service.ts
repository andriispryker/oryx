import { TemplateResult } from 'lit';

export const ComponentsRegistryService = 'FES.ComponentsRegistry';

export interface ComponentsRegistryService {
  resolveTemplate(
    type: string,
    uid: string,
    layoutClasses?: string
  ): TemplateResult | undefined;
  hydrateOnDemand(element: HTMLElement): Promise<void>;
}

declare global {
  interface InjectionTokensContractMap {
    [ComponentsRegistryService]: ComponentsRegistryService;
  }
}