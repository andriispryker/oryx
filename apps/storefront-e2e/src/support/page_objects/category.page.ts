import { AbstractSFPage } from './abstract.page';
import { TestCategoryData } from '../../types/category.type';
export class CategoryPage extends AbstractSFPage {
  url = '/category/';
  categoryId: string;

  constructor(categoryData?: TestCategoryData) {
    super();

    if (categoryData) {
      this.categoryId = categoryData.id;
      this.url += categoryData.id;
    }
  }

  waitForLoadedSSR(): void {
    this.getFacets().should('be.visible');
  }

  waitForLoadedSPA(): void {
    this.waitForLoadedSSR();
  }

  getFacets = () => cy.get('oryx-search-facet');
  getOryxCards = () => cy.get('oryx-product-card');
  getProductSort = () => cy.get('oryx-search-product-sort');
}