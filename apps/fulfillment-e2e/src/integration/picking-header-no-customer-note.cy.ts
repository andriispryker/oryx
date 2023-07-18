import { PickingPage } from '../support/page_objects/picking.page';
import { PickingHeaderFragment } from '../support/page_fragments/picking-header.fragment';

const pickingListId = 'd5bf20f1-7f36-568d-85b5-e4502acbcc82';

const pickingPage = new PickingPage(pickingListId);
const pickingHeaderFragment = new PickingHeaderFragment();

describe('picking header with no customer note', () => {
  beforeEach(() => {
    cy.clearIndexedDB();
    cy.login();
    pickingPage.visit();
  });

  it('should not display customer note icon', () => {
    pickingHeaderFragment.getCustomerNoteIcon().should('not.exist');
  });
});