import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRecommendationResultComponent } from './product-recommendation-result.component';

describe('ProductRecommendationResultComponent', () => {
  let component: ProductRecommendationResultComponent;
  let fixture: ComponentFixture<ProductRecommendationResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRecommendationResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRecommendationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
