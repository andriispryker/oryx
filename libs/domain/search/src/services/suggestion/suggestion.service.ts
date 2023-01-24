import { HttpErrorResponse } from '@spryker-oryx/core';
import { NullableGeneric } from '@spryker-oryx/utilities';
import { Observable } from 'rxjs';
import { Suggestion, SuggestionQualifier } from '../../models';

export interface SuggestionService {
  get(qualifier: SuggestionQualifier): Observable<NullableGeneric<Suggestion>>;
  getError(
    qualifier: SuggestionQualifier
  ): Observable<NullableGeneric<HttpErrorResponse>>;
}

export const SuggestionService = 'oryx.SuggestionService';

declare global {
  interface InjectionTokensContractMap {
    [SuggestionService]: SuggestionService;
  }
}
