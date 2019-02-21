import { TestBed } from '@angular/core/testing';

import { ProductCategoryHttpService } from './product-category-http.service';

describe('ProductCategoryHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductCategoryHttpService = TestBed.get(ProductCategoryHttpService);
    expect(service).toBeTruthy();
  });
});
