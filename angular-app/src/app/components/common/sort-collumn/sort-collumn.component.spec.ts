import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortCollumnComponent } from './sort-collumn.component';

describe('SortCollumnComponent', () => {
  let component: SortCollumnComponent;
  let fixture: ComponentFixture<SortCollumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortCollumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortCollumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
