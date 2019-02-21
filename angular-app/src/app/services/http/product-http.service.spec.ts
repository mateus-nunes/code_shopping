import { TestBed } from '@angular/core/testing';

import { ProductHttpService } from './product-http.service';

describe('ProductHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductHttpService = TestBed.get(ProductHttpService);
    expect(service).toBeTruthy();
  });
});
