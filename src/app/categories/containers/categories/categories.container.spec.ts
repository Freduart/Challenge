import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesContainer } from './categories.container';

describe('CategoriesContainer', () => {
  let component: CategoriesContainer;
  let fixture: ComponentFixture<CategoriesContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
