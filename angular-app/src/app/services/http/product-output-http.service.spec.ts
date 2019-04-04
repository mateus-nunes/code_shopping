import { TestBed } from '@angular/core/testing';

import { ProductOutputHttpService } from './product-output-http.service';

describe('ProductOutputHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductOutputHttpService = TestBed.get(ProductOutputHttpService);
    expect(service).toBeTruthy();
  });
});
