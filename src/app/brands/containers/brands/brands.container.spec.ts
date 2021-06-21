import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsContainer } from './brands.container';

describe('BrandsContainer', () => {
  let component: BrandsContainer;
  let fixture: ComponentFixture<BrandsContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandsContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
