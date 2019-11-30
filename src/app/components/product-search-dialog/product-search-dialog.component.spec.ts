import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchDialogComponent } from './product-search-dialog.component';

describe('ProductSearchDialogComponent', () => {
  let component: ProductSearchDialogComponent;
  let fixture: ComponentFixture<ProductSearchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSearchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
