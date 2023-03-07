import { Observable } from 'rxjs';
import { PickingList, PickingListQualifier } from '../models';

export interface PickingListService {
  get(qualifier?: PickingListQualifier): Observable<PickingList[]>;
  startPicking(pickingList: PickingList): Observable<PickingList>;
  updatePickingItems(pickingList: PickingList): Observable<PickingList>;
  finishPicking(pickingList: PickingList): Observable<PickingList>;
}

export const PickingListService = 'oryx.PickingListService';

declare global {
  export interface InjectionTokensContractMap {
    [PickingListService]: PickingListService;
  }
}