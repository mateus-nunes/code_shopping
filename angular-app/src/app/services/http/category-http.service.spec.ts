import { TestBed } from '@angular/core/testing';

import { CategoryHttpService } from './category-http.service';

describe('CategoryHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryHttpService = TestBed.get(CategoryHttpService);
    expect(service).toBeTruthy();
  });
});
