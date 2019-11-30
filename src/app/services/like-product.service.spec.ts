import { TestBed } from '@angular/core/testing';

import { LikeProductService } from './like-product.service';

describe('LikeProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LikeProductService = TestBed.get(LikeProductService);
    expect(service).toBeTruthy();
  });
});
