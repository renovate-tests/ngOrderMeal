import { NgOrderMealPage } from './app.po';

describe('ng-order-meal App', () => {
  let page: NgOrderMealPage;

  beforeEach(() => {
    page = new NgOrderMealPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
