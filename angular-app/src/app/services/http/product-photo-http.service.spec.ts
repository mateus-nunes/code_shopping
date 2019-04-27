import { TestBed } from '@angular/core/testing';

import { ProductPhotoHttpService } from './product-photo-http.service';

describe('ProductPhotoHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductPhotoHttpService = TestBed.get(ProductPhotoHttpService);
    expect(service).toBeTruthy();
  });
});
