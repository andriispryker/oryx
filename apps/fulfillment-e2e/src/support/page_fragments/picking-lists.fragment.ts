export class PickingListsFragment {
  getWrapper = () => cy.get('oryx-picking-lists');
  getPickingListsItem = () => this.getWrapper().find('oryx-picking-list-item');
}